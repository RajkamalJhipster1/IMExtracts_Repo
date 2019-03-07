package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ImExtractApp;

import io.github.jhipster.application.domain.IDXOrganisation;
import io.github.jhipster.application.repository.IDXOrganisationRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IDXOrganisationResource REST controller.
 *
 * @see IDXOrganisationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ImExtractApp.class)
public class IDXOrganisationResourceIntTest {

    private static final Integer DEFAULT_C_DB = 1;
    private static final Integer UPDATED_C_DB = 2;

    private static final String DEFAULT_ORGANISATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ORGANISATION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NATIONAL_PRACTICE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_NATIONAL_PRACTICE_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private IDXOrganisationRepository iDXOrganisationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restIDXOrganisationMockMvc;

    private IDXOrganisation iDXOrganisation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IDXOrganisationResource iDXOrganisationResource = new IDXOrganisationResource(iDXOrganisationRepository);
        this.restIDXOrganisationMockMvc = MockMvcBuilders.standaloneSetup(iDXOrganisationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IDXOrganisation createEntity(EntityManager em) {
        IDXOrganisation iDXOrganisation = new IDXOrganisation()
            .cDB(DEFAULT_C_DB)
            .organisationName(DEFAULT_ORGANISATION_NAME)
            .nationalPracticeCode(DEFAULT_NATIONAL_PRACTICE_CODE)
            .active(DEFAULT_ACTIVE);
        return iDXOrganisation;
    }

    @Before
    public void initTest() {
        iDXOrganisation = createEntity(em);
    }

    @Test
    @Transactional
    public void createIDXOrganisation() throws Exception {
        int databaseSizeBeforeCreate = iDXOrganisationRepository.findAll().size();

        // Create the IDXOrganisation
        restIDXOrganisationMockMvc.perform(post("/api/idx-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iDXOrganisation)))
            .andExpect(status().isCreated());

        // Validate the IDXOrganisation in the database
        List<IDXOrganisation> iDXOrganisationList = iDXOrganisationRepository.findAll();
        assertThat(iDXOrganisationList).hasSize(databaseSizeBeforeCreate + 1);
        IDXOrganisation testIDXOrganisation = iDXOrganisationList.get(iDXOrganisationList.size() - 1);
        assertThat(testIDXOrganisation.getcDB()).isEqualTo(DEFAULT_C_DB);
        assertThat(testIDXOrganisation.getOrganisationName()).isEqualTo(DEFAULT_ORGANISATION_NAME);
        assertThat(testIDXOrganisation.getNationalPracticeCode()).isEqualTo(DEFAULT_NATIONAL_PRACTICE_CODE);
        assertThat(testIDXOrganisation.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createIDXOrganisationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iDXOrganisationRepository.findAll().size();

        // Create the IDXOrganisation with an existing ID
        iDXOrganisation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIDXOrganisationMockMvc.perform(post("/api/idx-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iDXOrganisation)))
            .andExpect(status().isBadRequest());

        // Validate the IDXOrganisation in the database
        List<IDXOrganisation> iDXOrganisationList = iDXOrganisationRepository.findAll();
        assertThat(iDXOrganisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIDXOrganisations() throws Exception {
        // Initialize the database
        iDXOrganisationRepository.saveAndFlush(iDXOrganisation);

        // Get all the iDXOrganisationList
        restIDXOrganisationMockMvc.perform(get("/api/idx-organisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iDXOrganisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].cDB").value(hasItem(DEFAULT_C_DB)))
            .andExpect(jsonPath("$.[*].organisationName").value(hasItem(DEFAULT_ORGANISATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].nationalPracticeCode").value(hasItem(DEFAULT_NATIONAL_PRACTICE_CODE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getIDXOrganisation() throws Exception {
        // Initialize the database
        iDXOrganisationRepository.saveAndFlush(iDXOrganisation);

        // Get the iDXOrganisation
        restIDXOrganisationMockMvc.perform(get("/api/idx-organisations/{id}", iDXOrganisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iDXOrganisation.getId().intValue()))
            .andExpect(jsonPath("$.cDB").value(DEFAULT_C_DB))
            .andExpect(jsonPath("$.organisationName").value(DEFAULT_ORGANISATION_NAME.toString()))
            .andExpect(jsonPath("$.nationalPracticeCode").value(DEFAULT_NATIONAL_PRACTICE_CODE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIDXOrganisation() throws Exception {
        // Get the iDXOrganisation
        restIDXOrganisationMockMvc.perform(get("/api/idx-organisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIDXOrganisation() throws Exception {
        // Initialize the database
        iDXOrganisationRepository.saveAndFlush(iDXOrganisation);

        int databaseSizeBeforeUpdate = iDXOrganisationRepository.findAll().size();

        // Update the iDXOrganisation
        IDXOrganisation updatedIDXOrganisation = iDXOrganisationRepository.findById(iDXOrganisation.getId()).get();
        // Disconnect from session so that the updates on updatedIDXOrganisation are not directly saved in db
        em.detach(updatedIDXOrganisation);
        updatedIDXOrganisation
            .cDB(UPDATED_C_DB)
            .organisationName(UPDATED_ORGANISATION_NAME)
            .nationalPracticeCode(UPDATED_NATIONAL_PRACTICE_CODE)
            .active(UPDATED_ACTIVE);

        restIDXOrganisationMockMvc.perform(put("/api/idx-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIDXOrganisation)))
            .andExpect(status().isOk());

        // Validate the IDXOrganisation in the database
        List<IDXOrganisation> iDXOrganisationList = iDXOrganisationRepository.findAll();
        assertThat(iDXOrganisationList).hasSize(databaseSizeBeforeUpdate);
        IDXOrganisation testIDXOrganisation = iDXOrganisationList.get(iDXOrganisationList.size() - 1);
        assertThat(testIDXOrganisation.getcDB()).isEqualTo(UPDATED_C_DB);
        assertThat(testIDXOrganisation.getOrganisationName()).isEqualTo(UPDATED_ORGANISATION_NAME);
        assertThat(testIDXOrganisation.getNationalPracticeCode()).isEqualTo(UPDATED_NATIONAL_PRACTICE_CODE);
        assertThat(testIDXOrganisation.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingIDXOrganisation() throws Exception {
        int databaseSizeBeforeUpdate = iDXOrganisationRepository.findAll().size();

        // Create the IDXOrganisation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIDXOrganisationMockMvc.perform(put("/api/idx-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iDXOrganisation)))
            .andExpect(status().isBadRequest());

        // Validate the IDXOrganisation in the database
        List<IDXOrganisation> iDXOrganisationList = iDXOrganisationRepository.findAll();
        assertThat(iDXOrganisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIDXOrganisation() throws Exception {
        // Initialize the database
        iDXOrganisationRepository.saveAndFlush(iDXOrganisation);

        int databaseSizeBeforeDelete = iDXOrganisationRepository.findAll().size();

        // Delete the iDXOrganisation
        restIDXOrganisationMockMvc.perform(delete("/api/idx-organisations/{id}", iDXOrganisation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IDXOrganisation> iDXOrganisationList = iDXOrganisationRepository.findAll();
        assertThat(iDXOrganisationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IDXOrganisation.class);
        IDXOrganisation iDXOrganisation1 = new IDXOrganisation();
        iDXOrganisation1.setId(1L);
        IDXOrganisation iDXOrganisation2 = new IDXOrganisation();
        iDXOrganisation2.setId(iDXOrganisation1.getId());
        assertThat(iDXOrganisation1).isEqualTo(iDXOrganisation2);
        iDXOrganisation2.setId(2L);
        assertThat(iDXOrganisation1).isNotEqualTo(iDXOrganisation2);
        iDXOrganisation1.setId(null);
        assertThat(iDXOrganisation1).isNotEqualTo(iDXOrganisation2);
    }
}
