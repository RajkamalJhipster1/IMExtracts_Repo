import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AccountService } from 'app/core';
import { AgreementOrganisationService } from './agreement-organisation.service';

@Component({
    selector: 'jhi-agreement-organisation',
    templateUrl: './agreement-organisation.component.html'
})
export class AgreementOrganisationComponent implements OnInit, OnDestroy {
    agreementOrganisations: IAgreementOrganisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agreementOrganisationService: AgreementOrganisationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agreementOrganisationService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgreementOrganisation[]>) => res.ok),
                map((res: HttpResponse<IAgreementOrganisation[]>) => res.body)
            )
            .subscribe(
                (res: IAgreementOrganisation[]) => {
                    this.agreementOrganisations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgreementOrganisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgreementOrganisation) {
        return item.id;
    }

    registerChangeInAgreementOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe('agreementOrganisationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
