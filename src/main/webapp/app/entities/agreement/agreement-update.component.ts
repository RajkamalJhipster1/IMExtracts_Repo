import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAgreement } from 'app/shared/model/agreement.model';
import { AgreementService } from './agreement.service';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from 'app/entities/agreement-organisation';

@Component({
    selector: 'jhi-agreement-update',
    templateUrl: './agreement-update.component.html'
})
export class AgreementUpdateComponent implements OnInit {
    agreement: IAgreement;
    isSaving: boolean;

    agreementids: IAgreementOrganisation[];
    createdDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected agreementService: AgreementService,
        protected agreementOrganisationService: AgreementOrganisationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agreement }) => {
            this.agreement = agreement;
            this.createdDate = this.agreement.createdDate != null ? this.agreement.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.agreementOrganisationService
            .query({ filter: 'agreement-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAgreementOrganisation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAgreementOrganisation[]>) => response.body)
            )
            .subscribe(
                (res: IAgreementOrganisation[]) => {
                    if (!this.agreement.agreementid || !this.agreement.agreementid.id) {
                        this.agreementids = res;
                    } else {
                        this.agreementOrganisationService
                            .find(this.agreement.agreementid.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAgreementOrganisation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAgreementOrganisation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAgreementOrganisation) => (this.agreementids = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.agreement.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.agreement.id !== undefined) {
            this.subscribeToSaveResponse(this.agreementService.update(this.agreement));
        } else {
            this.subscribeToSaveResponse(this.agreementService.create(this.agreement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgreement>>) {
        result.subscribe((res: HttpResponse<IAgreement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAgreementOrganisationById(index: number, item: IAgreementOrganisation) {
        return item.id;
    }
}
