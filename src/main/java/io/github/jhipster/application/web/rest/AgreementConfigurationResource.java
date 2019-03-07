package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.AgreementConfiguration;
import io.github.jhipster.application.repository.AgreementConfigurationRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AgreementConfiguration.
 */
@RestController
@RequestMapping("/api")
public class AgreementConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(AgreementConfigurationResource.class);

    private static final String ENTITY_NAME = "agreementConfiguration";

    private final AgreementConfigurationRepository agreementConfigurationRepository;

    public AgreementConfigurationResource(AgreementConfigurationRepository agreementConfigurationRepository) {
        this.agreementConfigurationRepository = agreementConfigurationRepository;
    }

    /**
     * POST  /agreement-configurations : Create a new agreementConfiguration.
     *
     * @param agreementConfiguration the agreementConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agreementConfiguration, or with status 400 (Bad Request) if the agreementConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agreement-configurations")
    public ResponseEntity<AgreementConfiguration> createAgreementConfiguration(@RequestBody AgreementConfiguration agreementConfiguration) throws URISyntaxException {
        log.debug("REST request to save AgreementConfiguration : {}", agreementConfiguration);
        if (agreementConfiguration.getId() != null) {
            throw new BadRequestAlertException("A new agreementConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgreementConfiguration result = agreementConfigurationRepository.save(agreementConfiguration);
        return ResponseEntity.created(new URI("/api/agreement-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agreement-configurations : Updates an existing agreementConfiguration.
     *
     * @param agreementConfiguration the agreementConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agreementConfiguration,
     * or with status 400 (Bad Request) if the agreementConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the agreementConfiguration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agreement-configurations")
    public ResponseEntity<AgreementConfiguration> updateAgreementConfiguration(@RequestBody AgreementConfiguration agreementConfiguration) throws URISyntaxException {
        log.debug("REST request to update AgreementConfiguration : {}", agreementConfiguration);
        if (agreementConfiguration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgreementConfiguration result = agreementConfigurationRepository.save(agreementConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agreementConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agreement-configurations : get all the agreementConfigurations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agreementConfigurations in body
     */
    @GetMapping("/agreement-configurations")
    public List<AgreementConfiguration> getAllAgreementConfigurations() {
        log.debug("REST request to get all AgreementConfigurations");
        return agreementConfigurationRepository.findAll();
    }

    /**
     * GET  /agreement-configurations/:id : get the "id" agreementConfiguration.
     *
     * @param id the id of the agreementConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agreementConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/agreement-configurations/{id}")
    public ResponseEntity<AgreementConfiguration> getAgreementConfiguration(@PathVariable Long id) {
        log.debug("REST request to get AgreementConfiguration : {}", id);
        Optional<AgreementConfiguration> agreementConfiguration = agreementConfigurationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agreementConfiguration);
    }

    /**
     * DELETE  /agreement-configurations/:id : delete the "id" agreementConfiguration.
     *
     * @param id the id of the agreementConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agreement-configurations/{id}")
    public ResponseEntity<Void> deleteAgreementConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete AgreementConfiguration : {}", id);
        agreementConfigurationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
