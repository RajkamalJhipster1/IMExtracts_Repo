package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.AgreementOrganisation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgreementOrganisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgreementOrganisationRepository extends JpaRepository<AgreementOrganisation, Long> {

}
