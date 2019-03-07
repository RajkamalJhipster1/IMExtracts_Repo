import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';

type EntityResponseType = HttpResponse<IIDXOrganisation>;
type EntityArrayResponseType = HttpResponse<IIDXOrganisation[]>;

@Injectable({ providedIn: 'root' })
export class IDXOrganisationService {
    public resourceUrl = SERVER_API_URL + 'api/idx-organisations';

    constructor(protected http: HttpClient) {}

    create(iDXOrganisation: IIDXOrganisation): Observable<EntityResponseType> {
        return this.http.post<IIDXOrganisation>(this.resourceUrl, iDXOrganisation, { observe: 'response' });
    }

    update(iDXOrganisation: IIDXOrganisation): Observable<EntityResponseType> {
        return this.http.put<IIDXOrganisation>(this.resourceUrl, iDXOrganisation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIDXOrganisation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIDXOrganisation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
