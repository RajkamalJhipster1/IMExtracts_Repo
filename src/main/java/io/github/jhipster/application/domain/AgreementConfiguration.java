package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AgreementConfiguration.
 */
@Entity
@Table(name = "agreement_configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgreementConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "configuration")
    private byte[] configuration;

    @Column(name = "configuration_content_type")
    private String configurationContentType;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "createddate")
    private Instant createddate;

    @Column(name = "modified_date")
    private Instant modifiedDate;

    @ManyToOne
    @JsonIgnoreProperties("agreementids")
    private Agreement agreement;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getConfiguration() {
        return configuration;
    }

    public AgreementConfiguration configuration(byte[] configuration) {
        this.configuration = configuration;
        return this;
    }

    public void setConfiguration(byte[] configuration) {
        this.configuration = configuration;
    }

    public String getConfigurationContentType() {
        return configurationContentType;
    }

    public AgreementConfiguration configurationContentType(String configurationContentType) {
        this.configurationContentType = configurationContentType;
        return this;
    }

    public void setConfigurationContentType(String configurationContentType) {
        this.configurationContentType = configurationContentType;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public AgreementConfiguration isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Instant getCreateddate() {
        return createddate;
    }

    public AgreementConfiguration createddate(Instant createddate) {
        this.createddate = createddate;
        return this;
    }

    public void setCreateddate(Instant createddate) {
        this.createddate = createddate;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public AgreementConfiguration modifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Agreement getAgreement() {
        return agreement;
    }

    public AgreementConfiguration agreement(Agreement agreement) {
        this.agreement = agreement;
        return this;
    }

    public void setAgreement(Agreement agreement) {
        this.agreement = agreement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AgreementConfiguration agreementConfiguration = (AgreementConfiguration) o;
        if (agreementConfiguration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agreementConfiguration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgreementConfiguration{" +
            "id=" + getId() +
            ", configuration='" + getConfiguration() + "'" +
            ", configurationContentType='" + getConfigurationContentType() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", createddate='" + getCreateddate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            "}";
    }
}
