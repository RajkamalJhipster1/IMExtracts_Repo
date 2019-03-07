package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.AgreementOrganisation;
import io.github.jhipster.application.repository.AgreementOrganisationRepository;
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
 * REST controller for managing AgreementOrganisation.
 */
@RestController
@RequestMapping("/api")
public class AgreementOrganisationResource {

    private final Logger log = LoggerFactory.getLogger(AgreementOrganisationResource.class);

    private static final String ENTITY_NAME = "agreementOrganisation";

    private final AgreementOrganisationRepository agreementOrganisationRepository;

    public AgreementOrganisationResource(AgreementOrganisationRepository agreementOrganisationRepository) {
        this.agreementOrganisationRepository = agreementOrganisationRepository;
    }

    /**
     * POST  /agreement-organisations : Create a new agreementOrganisation.
     *
     * @param agreementOrganisation the agreementOrganisation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agreementOrganisation, or with status 400 (Bad Request) if the agreementOrganisation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agreement-organisations")
    public ResponseEntity<AgreementOrganisation> createAgreementOrganisation(@RequestBody AgreementOrganisation agreementOrganisation) throws URISyntaxException {
        log.debug("REST request to save AgreementOrganisation : {}", agreementOrganisation);
        if (agreementOrganisation.getId() != null) {
            throw new BadRequestAlertException("A new agreementOrganisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgreementOrganisation result = agreementOrganisationRepository.save(agreementOrganisation);
        return ResponseEntity.created(new URI("/api/agreement-organisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agreement-organisations : Updates an existing agreementOrganisation.
     *
     * @param agreementOrganisation the agreementOrganisation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agreementOrganisation,
     * or with status 400 (Bad Request) if the agreementOrganisation is not valid,
     * or with status 500 (Internal Server Error) if the agreementOrganisation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agreement-organisations")
    public ResponseEntity<AgreementOrganisation> updateAgreementOrganisation(@RequestBody AgreementOrganisation agreementOrganisation) throws URISyntaxException {
        log.debug("REST request to update AgreementOrganisation : {}", agreementOrganisation);
        if (agreementOrganisation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgreementOrganisation result = agreementOrganisationRepository.save(agreementOrganisation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agreementOrganisation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agreement-organisations : get all the agreementOrganisations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agreementOrganisations in body
     */
    @GetMapping("/agreement-organisations")
    public List<AgreementOrganisation> getAllAgreementOrganisations() {
        log.debug("REST request to get all AgreementOrganisations");
        return agreementOrganisationRepository.findAll();
    }

    /**
     * GET  /agreement-organisations/:id : get the "id" agreementOrganisation.
     *
     * @param id the id of the agreementOrganisation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agreementOrganisation, or with status 404 (Not Found)
     */
    @GetMapping("/agreement-organisations/{id}")
    public ResponseEntity<AgreementOrganisation> getAgreementOrganisation(@PathVariable Long id) {
        log.debug("REST request to get AgreementOrganisation : {}", id);
        Optional<AgreementOrganisation> agreementOrganisation = agreementOrganisationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agreementOrganisation);
    }

    /**
     * DELETE  /agreement-organisations/:id : delete the "id" agreementOrganisation.
     *
     * @param id the id of the agreementOrganisation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agreement-organisations/{id}")
    public ResponseEntity<Void> deleteAgreementOrganisation(@PathVariable Long id) {
        log.debug("REST request to delete AgreementOrganisation : {}", id);
        agreementOrganisationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
