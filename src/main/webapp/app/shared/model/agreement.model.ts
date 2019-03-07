import { Moment } from 'moment';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

export interface IAgreement {
    id?: number;
    agreementname?: string;
    agreementtypeid?: number;
    deleted?: boolean;
    createdDate?: Moment;
    agreementid?: IAgreementOrganisation;
    agreementids?: IAgreementConfiguration[];
}

export class Agreement implements IAgreement {
    constructor(
        public id?: number,
        public agreementname?: string,
        public agreementtypeid?: number,
        public deleted?: boolean,
        public createdDate?: Moment,
        public agreementid?: IAgreementOrganisation,
        public agreementids?: IAgreementConfiguration[]
    ) {
        this.deleted = this.deleted || false;
    }
}
