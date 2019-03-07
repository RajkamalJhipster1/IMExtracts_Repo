import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

type EntityResponseType = HttpResponse<IAgreementConfiguration>;
type EntityArrayResponseType = HttpResponse<IAgreementConfiguration[]>;

@Injectable({ providedIn: 'root' })
export class AgreementConfigurationService {
    public resourceUrl = SERVER_API_URL + 'api/agreement-configurations';

    constructor(protected http: HttpClient) {}

    create(agreementConfiguration: IAgreementConfiguration): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agreementConfiguration);
        return this.http
            .post<IAgreementConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(agreementConfiguration: IAgreementConfiguration): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agreementConfiguration);
        return this.http
            .put<IAgreementConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAgreementConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAgreementConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(agreementConfiguration: IAgreementConfiguration): IAgreementConfiguration {
        const copy: IAgreementConfiguration = Object.assign({}, agreementConfiguration, {
            createddate:
                agreementConfiguration.createddate != null && agreementConfiguration.createddate.isValid()
                    ? agreementConfiguration.createddate.toJSON()
                    : null,
            modifiedDate:
                agreementConfiguration.modifiedDate != null && agreementConfiguration.modifiedDate.isValid()
                    ? agreementConfiguration.modifiedDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createddate = res.body.createddate != null ? moment(res.body.createddate) : null;
            res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((agreementConfiguration: IAgreementConfiguration) => {
                agreementConfiguration.createddate =
                    agreementConfiguration.createddate != null ? moment(agreementConfiguration.createddate) : null;
                agreementConfiguration.modifiedDate =
                    agreementConfiguration.modifiedDate != null ? moment(agreementConfiguration.modifiedDate) : null;
            });
        }
        return res;
    }
}
