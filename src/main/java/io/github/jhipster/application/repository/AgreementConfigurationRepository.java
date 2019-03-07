package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.AgreementConfiguration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgreementConfiguration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgreementConfigurationRepository extends JpaRepository<AgreementConfiguration, Long> {

}
