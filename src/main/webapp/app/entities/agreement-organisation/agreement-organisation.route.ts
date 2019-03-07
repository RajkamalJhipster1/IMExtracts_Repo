import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from './agreement-organisation.service';
import { AgreementOrganisationComponent } from './agreement-organisation.component';
import { AgreementOrganisationDetailComponent } from './agreement-organisation-detail.component';
import { AgreementOrganisationUpdateComponent } from './agreement-organisation-update.component';
import { AgreementOrganisationDeletePopupComponent } from './agreement-organisation-delete-dialog.component';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

@Injectable({ providedIn: 'root' })
export class AgreementOrganisationResolve implements Resolve<IAgreementOrganisation> {
    constructor(private service: AgreementOrganisationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgreementOrganisation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AgreementOrganisation>) => response.ok),
                map((agreementOrganisation: HttpResponse<AgreementOrganisation>) => agreementOrganisation.body)
            );
        }
        return of(new AgreementOrganisation());
    }
}

export const agreementOrganisationRoute: Routes = [
    {
        path: '',
        component: AgreementOrganisationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgreementOrganisationDetailComponent,
        resolve: {
            agreementOrganisation: AgreementOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgreementOrganisationUpdateComponent,
        resolve: {
            agreementOrganisation: AgreementOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementOrganisations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgreementOrganisationUpdateComponent,
        resolve: {
            agreementOrganisation: AgreementOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementOrganisations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agreementOrganisationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgreementOrganisationDeletePopupComponent,
        resolve: {
            agreementOrganisation: AgreementOrganisationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementOrganisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
