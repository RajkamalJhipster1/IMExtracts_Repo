package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Agreement.
 */
@Entity
@Table(name = "agreement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agreement implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agreementname")
    private String agreementname;

    @Column(name = "agreementtypeid")
    private Integer agreementtypeid;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "created_date")
    private Instant createdDate;

    @OneToOne
    @JoinColumn(unique = true)
    private AgreementOrganisation agreementid;

    @OneToMany(mappedBy = "agreement")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AgreementConfiguration> agreementids = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgreementname() {
        return agreementname;
    }

    public Agreement agreementname(String agreementname) {
        this.agreementname = agreementname;
        return this;
    }

    public void setAgreementname(String agreementname) {
        this.agreementname = agreementname;
    }

    public Integer getAgreementtypeid() {
        return agreementtypeid;
    }

    public Agreement agreementtypeid(Integer agreementtypeid) {
        this.agreementtypeid = agreementtypeid;
        return this;
    }

    public void setAgreementtypeid(Integer agreementtypeid) {
        this.agreementtypeid = agreementtypeid;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Agreement deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Agreement createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public AgreementOrganisation getAgreementid() {
        return agreementid;
    }

    public Agreement agreementid(AgreementOrganisation agreementOrganisation) {
        this.agreementid = agreementOrganisation;
        return this;
    }

    public void setAgreementid(AgreementOrganisation agreementOrganisation) {
        this.agreementid = agreementOrganisation;
    }

    public Set<AgreementConfiguration> getAgreementids() {
        return agreementids;
    }

    public Agreement agreementids(Set<AgreementConfiguration> agreementConfigurations) {
        this.agreementids = agreementConfigurations;
        return this;
    }

    public Agreement addAgreementid(AgreementConfiguration agreementConfiguration) {
        this.agreementids.add(agreementConfiguration);
        agreementConfiguration.setAgreement(this);
        return this;
    }

    public Agreement removeAgreementid(AgreementConfiguration agreementConfiguration) {
        this.agreementids.remove(agreementConfiguration);
        agreementConfiguration.setAgreement(null);
        return this;
    }

    public void setAgreementids(Set<AgreementConfiguration> agreementConfigurations) {
        this.agreementids = agreementConfigurations;
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
        Agreement agreement = (Agreement) o;
        if (agreement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agreement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agreement{" +
            "id=" + getId() +
            ", agreementname='" + getAgreementname() + "'" +
            ", agreementtypeid=" + getAgreementtypeid() +
            ", deleted='" + isDeleted() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
