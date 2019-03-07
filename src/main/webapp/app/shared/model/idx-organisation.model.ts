import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

export interface IIDXOrganisation {
    id?: number;
    cDB?: number;
    organisationName?: string;
    nationalPracticeCode?: string;
    active?: boolean;
    organisationid?: IAgreementOrganisation;
}

export class IDXOrganisation implements IIDXOrganisation {
    constructor(
        public id?: number,
        public cDB?: number,
        public organisationName?: string,
        public nationalPracticeCode?: string,
        public active?: boolean,
        public organisationid?: IAgreementOrganisation
    ) {
        this.active = this.active || false;
    }
}
