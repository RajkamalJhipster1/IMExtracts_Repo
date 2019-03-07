import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';
import { AccountService } from 'app/core';
import { AgreementConfigurationService } from './agreement-configuration.service';

@Component({
    selector: 'jhi-agreement-configuration',
    templateUrl: './agreement-configuration.component.html'
})
export class AgreementConfigurationComponent implements OnInit, OnDestroy {
    agreementConfigurations: IAgreementConfiguration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agreementConfigurationService: AgreementConfigurationService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agreementConfigurationService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgreementConfiguration[]>) => res.ok),
                map((res: HttpResponse<IAgreementConfiguration[]>) => res.body)
            )
            .subscribe(
                (res: IAgreementConfiguration[]) => {
                    this.agreementConfigurations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgreementConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgreementConfiguration) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInAgreementConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('agreementConfigurationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
