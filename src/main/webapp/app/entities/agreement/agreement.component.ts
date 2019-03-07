import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgreement } from 'app/shared/model/agreement.model';
import { AccountService } from 'app/core';
import { AgreementService } from './agreement.service';

@Component({
    selector: 'jhi-agreement',
    templateUrl: './agreement.component.html'
})
export class AgreementComponent implements OnInit, OnDestroy {
    agreements: IAgreement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agreementService: AgreementService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agreementService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgreement[]>) => res.ok),
                map((res: HttpResponse<IAgreement[]>) => res.body)
            )
            .subscribe(
                (res: IAgreement[]) => {
                    this.agreements = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgreements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgreement) {
        return item.id;
    }

    registerChangeInAgreements() {
        this.eventSubscriber = this.eventManager.subscribe('agreementListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
