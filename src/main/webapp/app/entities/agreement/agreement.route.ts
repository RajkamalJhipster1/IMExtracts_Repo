import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Agreement } from 'app/shared/model/agreement.model';
import { AgreementService } from './agreement.service';
import { AgreementComponent } from './agreement.component';
import { AgreementDetailComponent } from './agreement-detail.component';
import { AgreementUpdateComponent } from './agreement-update.component';
import { AgreementDeletePopupComponent } from './agreement-delete-dialog.component';
import { IAgreement } from 'app/shared/model/agreement.model';

@Injectable({ providedIn: 'root' })
export class AgreementResolve implements Resolve<IAgreement> {
    constructor(private service: AgreementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgreement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Agreement>) => response.ok),
                map((agreement: HttpResponse<Agreement>) => agreement.body)
            );
        }
        return of(new Agreement());
    }
}

export const agreementRoute: Routes = [
    {
        path: '',
        component: AgreementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgreementDetailComponent,
        resolve: {
            agreement: AgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgreementUpdateComponent,
        resolve: {
            agreement: AgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgreementUpdateComponent,
        resolve: {
            agreement: AgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agreements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agreementPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgreementDeletePopupComponent,
        resolve: {
            agreement: AgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agreements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
