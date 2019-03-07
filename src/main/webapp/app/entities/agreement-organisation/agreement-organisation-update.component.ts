import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from './agreement-organisation.service';

@Component({
    selector: 'jhi-agreement-organisation-update',
    templateUrl: './agreement-organisation-update.component.html'
})
export class AgreementOrganisationUpdateComponent implements OnInit {
    agreementOrganisation: IAgreementOrganisation;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(protected agreementOrganisationService: AgreementOrganisationService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agreementOrganisation }) => {
            this.agreementOrganisation = agreementOrganisation;
            this.createdDate =
                this.agreementOrganisation.createdDate != null ? this.agreementOrganisation.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate =
                this.agreementOrganisation.modifiedDate != null ? this.agreementOrganisation.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.agreementOrganisation.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.agreementOrganisation.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.agreementOrganisation.id !== undefined) {
            this.subscribeToSaveResponse(this.agreementOrganisationService.update(this.agreementOrganisation));
        } else {
            this.subscribeToSaveResponse(this.agreementOrganisationService.create(this.agreementOrganisation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgreementOrganisation>>) {
        result.subscribe(
            (res: HttpResponse<IAgreementOrganisation>) => this.onSaveSuccess(),
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
}
