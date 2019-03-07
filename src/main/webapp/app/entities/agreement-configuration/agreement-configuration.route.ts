import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AgreementConfiguration } from 'app/shared/model/agreement-configuration.model';
import { AgreementConfigurationService } from './agreement-configuration.service';
import { AgreementConfigurationComponent } from './agreement-configuration.component';
import { AgreementConfigurationDetailComponent } from './agreement-configuration-detail.component';
import { AgreementConfigurationUpdateComponent } from './agreement-configuration-update.component';
import { AgreementConfigurationDeletePopupComponent } from './agreement-configuration-delete-dialog.component';
import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

@Injectable({ providedIn: 'root' })
export class AgreementConfigurationResolve implements Resolve<IAgreementConfiguration> {
    constructor(private service: AgreementConfigurationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgreementConfiguration> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AgreementConfiguration>) => response.ok),
                map((agreementConfiguration: HttpResponse<AgreementConfiguration>) => agreementConfiguration.body)
            );
        }
        return of(new AgreementConfiguration());
    }
}

export const agreementConfigurationRoute: Routes = [
    {
        path: '',
        component: AgreementConfigurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgreementConfigurationDetailComponent,
        resolve: {
            agreementConfiguration: AgreementConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgreementConfigurationUpdateComponent,
        resolve: {
            agreementConfiguration: AgreementConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgreementConfigurationUpdateComponent,
        resolve: {
            agreementConfiguration: AgreementConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementConfigurations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agreementConfigurationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgreementConfigurationDeletePopupComponent,
        resolve: {
            agreementConfiguration: AgreementConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgreementConfigurations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
