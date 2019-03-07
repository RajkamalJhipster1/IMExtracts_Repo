import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

type EntityResponseType = HttpResponse<IAgreementOrganisation>;
type EntityArrayResponseType = HttpResponse<IAgreementOrganisation[]>;

@Injectable({ providedIn: 'root' })
export class AgreementOrganisationService {
    public resourceUrl = SERVER_API_URL + 'api/agreement-organisations';

    constructor(protected http: HttpClient) {}

    create(agreementOrganisation: IAgreementOrganisation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agreementOrganisation);
        return this.http
            .post<IAgreementOrganisation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(agreementOrganisation: IAgreementOrganisation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agreementOrganisation);
        return this.http
            .put<IAgreementOrganisation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAgreementOrganisation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAgreementOrganisation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(agreementOrganisation: IAgreementOrganisation): IAgreementOrganisation {
        const copy: IAgreementOrganisation = Object.assign({}, agreementOrganisation, {
            createdDate:
                agreementOrganisation.createdDate != null && agreementOrganisation.createdDate.isValid()
                    ? agreementOrganisation.createdDate.toJSON()
                    : null,
            modifiedDate:
                agreementOrganisation.modifiedDate != null && agreementOrganisation.modifiedDate.isValid()
                    ? agreementOrganisation.modifiedDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((agreementOrganisation: IAgreementOrganisation) => {
                agreementOrganisation.createdDate =
                    agreementOrganisation.createdDate != null ? moment(agreementOrganisation.createdDate) : null;
                agreementOrganisation.modifiedDate =
                    agreementOrganisation.modifiedDate != null ? moment(agreementOrganisation.modifiedDate) : null;
            });
        }
        return res;
    }
}
