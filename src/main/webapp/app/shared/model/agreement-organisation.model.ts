import { Moment } from 'moment';

export interface IAgreementOrganisation {
    id?: number;
    createdDate?: Moment;
    modifiedDate?: Moment;
}

export class AgreementOrganisation implements IAgreementOrganisation {
    constructor(public id?: number, public createdDate?: Moment, public modifiedDate?: Moment) {}
}
