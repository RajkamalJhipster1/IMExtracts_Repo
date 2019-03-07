package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.IDXOrganisation;
import io.github.jhipster.application.repository.IDXOrganisationRepository;
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
 * REST controller for managing IDXOrganisation.
 */
@RestController
@RequestMapping("/api")
public class IDXOrganisationResource {

    private final Logger log = LoggerFactory.getLogger(IDXOrganisationResource.class);

    private static final String ENTITY_NAME = "iDXOrganisation";

    private final IDXOrganisationRepository iDXOrganisationRepository;

    public IDXOrganisationResource(IDXOrganisationRepository iDXOrganisationRepository) {
        this.iDXOrganisationRepository = iDXOrganisationRepository;
    }

    /**
     * POST  /idx-organisations : Create a new iDXOrganisation.
     *
     * @param iDXOrganisation the iDXOrganisation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iDXOrganisation, or with status 400 (Bad Request) if the iDXOrganisation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/idx-organisations")
    public ResponseEntity<IDXOrganisation> createIDXOrganisation(@RequestBody IDXOrganisation iDXOrganisation) throws URISyntaxException {
        log.debug("REST request to save IDXOrganisation : {}", iDXOrganisation);
        if (iDXOrganisation.getId() != null) {
            throw new BadRequestAlertException("A new iDXOrganisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IDXOrganisation result = iDXOrganisationRepository.save(iDXOrganisation);
        return ResponseEntity.created(new URI("/api/idx-organisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /idx-organisations : Updates an existing iDXOrganisation.
     *
     * @param iDXOrganisation the iDXOrganisation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iDXOrganisation,
     * or with status 400 (Bad Request) if the iDXOrganisation is not valid,
     * or with status 500 (Internal Server Error) if the iDXOrganisation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/idx-organisations")
    public ResponseEntity<IDXOrganisation> updateIDXOrganisation(@RequestBody IDXOrganisation iDXOrganisation) throws URISyntaxException {
        log.debug("REST request to update IDXOrganisation : {}", iDXOrganisation);
        if (iDXOrganisation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IDXOrganisation result = iDXOrganisationRepository.save(iDXOrganisation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iDXOrganisation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /idx-organisations : get all the iDXOrganisations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iDXOrganisations in body
     */
    @GetMapping("/idx-organisations")
    public List<IDXOrganisation> getAllIDXOrganisations() {
        log.debug("REST request to get all IDXOrganisations");
        return iDXOrganisationRepository.findAll();
    }

    /**
     * GET  /idx-organisations/:id : get the "id" iDXOrganisation.
     *
     * @param id the id of the iDXOrganisation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iDXOrganisation, or with status 404 (Not Found)
     */
    @GetMapping("/idx-organisations/{id}")
    public ResponseEntity<IDXOrganisation> getIDXOrganisation(@PathVariable Long id) {
        log.debug("REST request to get IDXOrganisation : {}", id);
        Optional<IDXOrganisation> iDXOrganisation = iDXOrganisationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iDXOrganisation);
    }

    /**
     * DELETE  /idx-organisations/:id : delete the "id" iDXOrganisation.
     *
     * @param id the id of the iDXOrganisation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/idx-organisations/{id}")
    public ResponseEntity<Void> deleteIDXOrganisation(@PathVariable Long id) {
        log.debug("REST request to delete IDXOrganisation : {}", id);
        iDXOrganisationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
