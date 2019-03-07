package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IDXOrganisation.
 */
@Entity
@Table(name = "idx_organisation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IDXOrganisation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "c_db")
    private Integer cDB;

    @Column(name = "organisation_name")
    private String organisationName;

    @Column(name = "national_practice_code")
    private String nationalPracticeCode;

    @Column(name = "active")
    private Boolean active;

    @OneToOne
    @JoinColumn(unique = true)
    private AgreementOrganisation organisationid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getcDB() {
        return cDB;
    }

    public IDXOrganisation cDB(Integer cDB) {
        this.cDB = cDB;
        return this;
    }

    public void setcDB(Integer cDB) {
        this.cDB = cDB;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public IDXOrganisation organisationName(String organisationName) {
        this.organisationName = organisationName;
        return this;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getNationalPracticeCode() {
        return nationalPracticeCode;
    }

    public IDXOrganisation nationalPracticeCode(String nationalPracticeCode) {
        this.nationalPracticeCode = nationalPracticeCode;
        return this;
    }

    public void setNationalPracticeCode(String nationalPracticeCode) {
        this.nationalPracticeCode = nationalPracticeCode;
    }

    public Boolean isActive() {
        return active;
    }

    public IDXOrganisation active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public AgreementOrganisation getOrganisationid() {
        return organisationid;
    }

    public IDXOrganisation organisationid(AgreementOrganisation agreementOrganisation) {
        this.organisationid = agreementOrganisation;
        return this;
    }

    public void setOrganisationid(AgreementOrganisation agreementOrganisation) {
        this.organisationid = agreementOrganisation;
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
        IDXOrganisation iDXOrganisation = (IDXOrganisation) o;
        if (iDXOrganisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), iDXOrganisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IDXOrganisation{" +
            "id=" + getId() +
            ", cDB=" + getcDB() +
            ", organisationName='" + getOrganisationName() + "'" +
            ", nationalPracticeCode='" + getNationalPracticeCode() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
