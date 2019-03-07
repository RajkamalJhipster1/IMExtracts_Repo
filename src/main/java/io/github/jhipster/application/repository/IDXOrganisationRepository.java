package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.IDXOrganisation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IDXOrganisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IDXOrganisationRepository extends JpaRepository<IDXOrganisation, Long> {

}
