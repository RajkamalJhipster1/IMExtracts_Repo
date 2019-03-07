import { Moment } from 'moment';
import { IAgreement } from 'app/shared/model/agreement.model';

export interface IAgreementConfiguration {
    id?: number;
    configurationContentType?: string;
    configuration?: any;
    isActive?: boolean;
    createddate?: Moment;
    modifiedDate?: Moment;
    agreement?: IAgreement;
}

export class AgreementConfiguration implements IAgreementConfiguration {
    constructor(
        public id?: number,
        public configurationContentType?: string,
        public configuration?: any,
        public isActive?: boolean,
        public createddate?: Moment,
        public modifiedDate?: Moment,
        public agreement?: IAgreement
    ) {
        this.isActive = this.isActive || false;
    }
}
