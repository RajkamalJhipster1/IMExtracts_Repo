package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ImExtractApp;

import io.github.jhipster.application.domain.AgreementConfiguration;
import io.github.jhipster.application.repository.AgreementConfigurationRepository;
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
import org.springframework.util.Base64Utils;
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
 * Test class for the AgreementConfigurationResource REST controller.
 *
 * @see AgreementConfigurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ImExtractApp.class)
public class AgreementConfigurationResourceIntTest {

    private static final byte[] DEFAULT_CONFIGURATION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONFIGURATION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONFIGURATION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONFIGURATION_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Instant DEFAULT_CREATEDDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATEDDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AgreementConfigurationRepository agreementConfigurationRepository;

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

    private MockMvc restAgreementConfigurationMockMvc;

    private AgreementConfiguration agreementConfiguration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgreementConfigurationResource agreementConfigurationResource = new AgreementConfigurationResource(agreementConfigurationRepository);
        this.restAgreementConfigurationMockMvc = MockMvcBuilders.standaloneSetup(agreementConfigurationResource)
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
    public static AgreementConfiguration createEntity(EntityManager em) {
        AgreementConfiguration agreementConfiguration = new AgreementConfiguration()
            .configuration(DEFAULT_CONFIGURATION)
            .configurationContentType(DEFAULT_CONFIGURATION_CONTENT_TYPE)
            .isActive(DEFAULT_IS_ACTIVE)
            .createddate(DEFAULT_CREATEDDATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE);
        return agreementConfiguration;
    }

    @Before
    public void initTest() {
        agreementConfiguration = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgreementConfiguration() throws Exception {
        int databaseSizeBeforeCreate = agreementConfigurationRepository.findAll().size();

        // Create the AgreementConfiguration
        restAgreementConfigurationMockMvc.perform(post("/api/agreement-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementConfiguration)))
            .andExpect(status().isCreated());

        // Validate the AgreementConfiguration in the database
        List<AgreementConfiguration> agreementConfigurationList = agreementConfigurationRepository.findAll();
        assertThat(agreementConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        AgreementConfiguration testAgreementConfiguration = agreementConfigurationList.get(agreementConfigurationList.size() - 1);
        assertThat(testAgreementConfiguration.getConfiguration()).isEqualTo(DEFAULT_CONFIGURATION);
        assertThat(testAgreementConfiguration.getConfigurationContentType()).isEqualTo(DEFAULT_CONFIGURATION_CONTENT_TYPE);
        assertThat(testAgreementConfiguration.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testAgreementConfiguration.getCreateddate()).isEqualTo(DEFAULT_CREATEDDATE);
        assertThat(testAgreementConfiguration.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createAgreementConfigurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agreementConfigurationRepository.findAll().size();

        // Create the AgreementConfiguration with an existing ID
        agreementConfiguration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgreementConfigurationMockMvc.perform(post("/api/agreement-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the AgreementConfiguration in the database
        List<AgreementConfiguration> agreementConfigurationList = agreementConfigurationRepository.findAll();
        assertThat(agreementConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgreementConfigurations() throws Exception {
        // Initialize the database
        agreementConfigurationRepository.saveAndFlush(agreementConfiguration);

        // Get all the agreementConfigurationList
        restAgreementConfigurationMockMvc.perform(get("/api/agreement-configurations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agreementConfiguration.getId().intValue())))
            .andExpect(jsonPath("$.[*].configurationContentType").value(hasItem(DEFAULT_CONFIGURATION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].configuration").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONFIGURATION))))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].createddate").value(hasItem(DEFAULT_CREATEDDATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAgreementConfiguration() throws Exception {
        // Initialize the database
        agreementConfigurationRepository.saveAndFlush(agreementConfiguration);

        // Get the agreementConfiguration
        restAgreementConfigurationMockMvc.perform(get("/api/agreement-configurations/{id}", agreementConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agreementConfiguration.getId().intValue()))
            .andExpect(jsonPath("$.configurationContentType").value(DEFAULT_CONFIGURATION_CONTENT_TYPE))
            .andExpect(jsonPath("$.configuration").value(Base64Utils.encodeToString(DEFAULT_CONFIGURATION)))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.createddate").value(DEFAULT_CREATEDDATE.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgreementConfiguration() throws Exception {
        // Get the agreementConfiguration
        restAgreementConfigurationMockMvc.perform(get("/api/agreement-configurations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgreementConfiguration() throws Exception {
        // Initialize the database
        agreementConfigurationRepository.saveAndFlush(agreementConfiguration);

        int databaseSizeBeforeUpdate = agreementConfigurationRepository.findAll().size();

        // Update the agreementConfiguration
        AgreementConfiguration updatedAgreementConfiguration = agreementConfigurationRepository.findById(agreementConfiguration.getId()).get();
        // Disconnect from session so that the updates on updatedAgreementConfiguration are not directly saved in db
        em.detach(updatedAgreementConfiguration);
        updatedAgreementConfiguration
            .configuration(UPDATED_CONFIGURATION)
            .configurationContentType(UPDATED_CONFIGURATION_CONTENT_TYPE)
            .isActive(UPDATED_IS_ACTIVE)
            .createddate(UPDATED_CREATEDDATE)
            .modifiedDate(UPDATED_MODIFIED_DATE);

        restAgreementConfigurationMockMvc.perform(put("/api/agreement-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgreementConfiguration)))
            .andExpect(status().isOk());

        // Validate the AgreementConfiguration in the database
        List<AgreementConfiguration> agreementConfigurationList = agreementConfigurationRepository.findAll();
        assertThat(agreementConfigurationList).hasSize(databaseSizeBeforeUpdate);
        AgreementConfiguration testAgreementConfiguration = agreementConfigurationList.get(agreementConfigurationList.size() - 1);
        assertThat(testAgreementConfiguration.getConfiguration()).isEqualTo(UPDATED_CONFIGURATION);
        assertThat(testAgreementConfiguration.getConfigurationContentType()).isEqualTo(UPDATED_CONFIGURATION_CONTENT_TYPE);
        assertThat(testAgreementConfiguration.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testAgreementConfiguration.getCreateddate()).isEqualTo(UPDATED_CREATEDDATE);
        assertThat(testAgreementConfiguration.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgreementConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = agreementConfigurationRepository.findAll().size();

        // Create the AgreementConfiguration

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgreementConfigurationMockMvc.perform(put("/api/agreement-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreementConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the AgreementConfiguration in the database
        List<AgreementConfiguration> agreementConfigurationList = agreementConfigurationRepository.findAll();
        assertThat(agreementConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgreementConfiguration() throws Exception {
        // Initialize the database
        agreementConfigurationRepository.saveAndFlush(agreementConfiguration);

        int databaseSizeBeforeDelete = agreementConfigurationRepository.findAll().size();

        // Delete the agreementConfiguration
        restAgreementConfigurationMockMvc.perform(delete("/api/agreement-configurations/{id}", agreementConfiguration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgreementConfiguration> agreementConfigurationList = agreementConfigurationRepository.findAll();
        assertThat(agreementConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgreementConfiguration.class);
        AgreementConfiguration agreementConfiguration1 = new AgreementConfiguration();
        agreementConfiguration1.setId(1L);
        AgreementConfiguration agreementConfiguration2 = new AgreementConfiguration();
        agreementConfiguration2.setId(agreementConfiguration1.getId());
        assertThat(agreementConfiguration1).isEqualTo(agreementConfiguration2);
        agreementConfiguration2.setId(2L);
        assertThat(agreementConfiguration1).isNotEqualTo(agreementConfiguration2);
        agreementConfiguration1.setId(null);
        assertThat(agreementConfiguration1).isNotEqualTo(agreementConfiguration2);
    }
}
