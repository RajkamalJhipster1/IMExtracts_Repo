import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';
import { AccountService } from 'app/core';
import { IDXOrganisationService } from './idx-organisation.service';

@Component({
    selector: 'jhi-idx-organisation',
    templateUrl: './idx-organisation.component.html'
})
export class IDXOrganisationComponent implements OnInit, OnDestroy {
    iDXOrganisations: IIDXOrganisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected iDXOrganisationService: IDXOrganisationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.iDXOrganisationService
            .query()
            .pipe(
                filter((res: HttpResponse<IIDXOrganisation[]>) => res.ok),
                map((res: HttpResponse<IIDXOrganisation[]>) => res.body)
            )
            .subscribe(
                (res: IIDXOrganisation[]) => {
                    this.iDXOrganisations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIDXOrganisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIDXOrganisation) {
        return item.id;
    }

    registerChangeInIDXOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe('iDXOrganisationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
