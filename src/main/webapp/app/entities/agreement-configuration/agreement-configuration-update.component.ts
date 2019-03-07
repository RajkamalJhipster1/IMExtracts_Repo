import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';
import { AgreementConfigurationService } from './agreement-configuration.service';
import { IAgreement } from 'app/shared/model/agreement.model';
import { AgreementService } from 'app/entities/agreement';

@Component({
    selector: 'jhi-agreement-configuration-update',
    templateUrl: './agreement-configuration-update.component.html'
})
export class AgreementConfigurationUpdateComponent implements OnInit {
    agreementConfiguration: IAgreementConfiguration;
    isSaving: boolean;

    agreements: IAgreement[];
    createddate: string;
    modifiedDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected agreementConfigurationService: AgreementConfigurationService,
        protected agreementService: AgreementService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agreementConfiguration }) => {
            this.agreementConfiguration = agreementConfiguration;
            this.createddate =
                this.agreementConfiguration.createddate != null ? this.agreementConfiguration.createddate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate =
                this.agreementConfiguration.modifiedDate != null ? this.agreementConfiguration.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.agreementService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAgreement[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAgreement[]>) => response.body)
            )
            .subscribe((res: IAgreement[]) => (this.agreements = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.agreementConfiguration.createddate = this.createddate != null ? moment(this.createddate, DATE_TIME_FORMAT) : null;
        this.agreementConfiguration.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.agreementConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(this.agreementConfigurationService.update(this.agreementConfiguration));
        } else {
            this.subscribeToSaveResponse(this.agreementConfigurationService.create(this.agreementConfiguration));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgreementConfiguration>>) {
        result.subscribe(
            (res: HttpResponse<IAgreementConfiguration>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackAgreementById(index: number, item: IAgreement) {
        return item.id;
    }
}
