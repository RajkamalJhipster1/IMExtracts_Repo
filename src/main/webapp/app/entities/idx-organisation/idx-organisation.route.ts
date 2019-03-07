import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDXOrganisation } from 'app/shared/model/idx-organisation.model';
import { IDXOrganisationService } from './idx-organisation.service';
import { IDXOrganisationComponent } from './idx-organisation.component';
import { IDXOrganisationDetailComponent } from './idx-organisation-detail.component';
import { IDXOrganisationUpdateComponent } from './idx-organisation-update.component';
import { IDXOrganisationDeletePopupComponent } from './idx-organisation-delete-dialog.component';
import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';

@Injectable({ providedIn: 'root' })
export class IDXOrganisationResolve implements Resolve<IIDXOrganisation> {
    constructor(private service: IDXOrganisationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIDXOrganisation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IDXOrganisation>) => response.ok),
                map((iDXOrganisation: HttpResponse<IDXOrganisation>) => iDXOrganisation.body)
            );
        }
        return of(new IDXOrganisation());
    }
}

export const iDXOrganisationRoute: Routes = [
    {
        path: '',
        component: IDXOrganisationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IDXOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IDXOrganisationDetailComponent,
        resolve: {
            iDXOrganisation: IDXOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IDXOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IDXOrganisationUpdateComponent,
        resolve: {
            iDXOrganisation: IDXOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IDXOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IDXOrganisationUpdateComponent,
        resolve: {
            iDXOrganisation: IDXOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IDXOrganisations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iDXOrganisationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IDXOrganisationDeletePopupComponent,
        resolve: {
            iDXOrganisation: IDXOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IDXOrganisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
