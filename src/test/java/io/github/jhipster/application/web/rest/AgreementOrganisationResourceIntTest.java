package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ImExtractApp;

import io.github.jhipster.application.domain.AgreementOrganisation;
import io.github.jhipster.application.repository.AgreementOrganisationRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AgreementOrganisationResource REST controller.
 *
 * @see AgreementOrganisationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ImExtractApp.class)
public class AgreementOrganisationResourceIntTest {

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AgreementOrganisationRepository agreementOrganisationRepository;

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

    private MockMvc restAgreementOrganisationMockMvc;

    private AgreementOrganisation agreementOrganisation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgreementOrganisationResource agreementOrganisationResource = new AgreementOrganisationResource(agreementOrganisationRepository);
        this.restAgreementOrganisationMockMvc = MockMvcBuilders.standaloneSetup(agreementOrganisationResource)
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
    public static AgreementOrganisation createEntity(EntityManager em) {
        AgreementOrganisation agreementOrganisation = new AgreementOrganisation()
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE);
        return agreementOrganisation;
    }

    @Before
    public void initTest() {
        agreementOrganisation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgreementOrganisation() throws Exception {
        int databaseSizeBeforeCreate = agreementOrganisationRepository.findAll().size();

        // Create the AgreementOrganisation
        restAgreementOrganisationMockMvc.perform(post("/api/agreement-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementOrganisation)))
            .andExpect(status().isCreated());

        // Validate the AgreementOrganisation in the database
        List<AgreementOrganisation> agreementOrganisationList = agreementOrganisationRepository.findAll();
        assertThat(agreementOrganisationList).hasSize(databaseSizeBeforeCreate + 1);
        AgreementOrganisation testAgreementOrganisation = agreementOrganisationList.get(agreementOrganisationList.size() - 1);
        assertThat(testAgreementOrganisation.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testAgreementOrganisation.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createAgreementOrganisationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agreementOrganisationRepository.findAll().size();

        // Create the AgreementOrganisation with an existing ID
        agreementOrganisation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgreementOrganisationMockMvc.perform(post("/api/agreement-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementOrganisation)))
            .andExpect(status().isBadRequest());

        // Validate the AgreementOrganisation in the database
        List<AgreementOrganisation> agreementOrganisationList = agreementOrganisationRepository.findAll();
        assertThat(agreementOrganisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgreementOrganisations() throws Exception {
        // Initialize the database
        agreementOrganisationRepository.saveAndFlush(agreementOrganisation);

        // Get all the agreementOrganisationList
        restAgreementOrganisationMockMvc.perform(get("/api/agreement-organisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agreementOrganisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAgreementOrganisation() throws Exception {
        // Initialize the database
        agreementOrganisationRepository.saveAndFlush(agreementOrganisation);

        // Get the agreementOrganisation
        restAgreementOrganisationMockMvc.perform(get("/api/agreement-organisations/{id}", agreementOrganisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agreementOrganisation.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgreementOrganisation() throws Exception {
        // Get the agreementOrganisation
        restAgreementOrganisationMockMvc.perform(get("/api/agreement-organisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgreementOrganisation() throws Exception {
        // Initialize the database
        agreementOrganisationRepository.saveAndFlush(agreementOrganisation);

        int databaseSizeBeforeUpdate = agreementOrganisationRepository.findAll().size();

        // Update the agreementOrganisation
        AgreementOrganisation updatedAgreementOrganisation = agreementOrganisationRepository.findById(agreementOrganisation.getId()).get();
        // Disconnect from session so that the updates on updatedAgreementOrganisation are not directly saved in db
        em.detach(updatedAgreementOrganisation);
        updatedAgreementOrganisation
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE);

        restAgreementOrganisationMockMvc.perform(put("/api/agreement-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgreementOrganisation)))
            .andExpect(status().isOk());

        // Validate the AgreementOrganisation in the database
        List<AgreementOrganisation> agreementOrganisationList = agreementOrganisationRepository.findAll();
        assertThat(agreementOrganisationList).hasSize(databaseSizeBeforeUpdate);
        AgreementOrganisation testAgreementOrganisation = agreementOrganisationList.get(agreementOrganisationList.size() - 1);
        assertThat(testAgreementOrganisation.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testAgreementOrganisation.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgreementOrganisation() throws Exception {
        int databaseSizeBeforeUpdate = agreementOrganisationRepository.findAll().size();

        // Create the AgreementOrganisation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgreementOrganisationMockMvc.perform(put("/api/agreement-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementOrganisation)))
            .andExpect(status().isBadRequest());

        // Validate the AgreementOrganisation in the database
        List<AgreementOrganisation> agreementOrganisationList = agreementOrganisationRepository.findAll();
        assertThat(agreementOrganisationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgreementOrganisation() throws Exception {
        // Initialize the database
        agreementOrganisationRepository.saveAndFlush(agreementOrganisation);

        int databaseSizeBeforeDelete = agreementOrganisationRepository.findAll().size();

        // Delete the agreementOrganisation
        restAgreementOrganisationMockMvc.perform(delete("/api/agreement-organisations/{id}", agreementOrganisation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgreementOrganisation> agreementOrganisationList = agreementOrganisationRepository.findAll();
        assertThat(agreementOrganisationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgreementOrganisation.class);
        AgreementOrganisation agreementOrganisation1 = new AgreementOrganisation();
        agreementOrganisation1.setId(1L);
        AgreementOrganisation agreementOrganisation2 = new AgreementOrganisation();
        agreementOrganisation2.setId(agreementOrganisation1.getId());
        assertThat(agreementOrganisation1).isEqualTo(agreementOrganisation2);
        agreementOrganisation2.setId(2L);
        assertThat(agreementOrganisation1).isNotEqualTo(agreementOrganisation2);
        agreementOrganisation1.setId(null);
        assertThat(agreementOrganisation1).isNotEqualTo(agreementOrganisation2);
    }
}
