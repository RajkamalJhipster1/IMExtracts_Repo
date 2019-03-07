import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';
import { IDXOrganisationService } from './idx-organisation.service';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from 'app/entities/agreement-organisation';

@Component({
    selector: 'jhi-idx-organisation-update',
    templateUrl: './idx-organisation-update.component.html'
})
export class IDXOrganisationUpdateComponent implements OnInit {
    iDXOrganisation: IIDXOrganisation;
    isSaving: boolean;

    organisationids: IAgreementOrganisation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected iDXOrganisationService: IDXOrganisationService,
        protected agreementOrganisationService: AgreementOrganisationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iDXOrganisation }) => {
            this.iDXOrganisation = iDXOrganisation;
        });
        this.agreementOrganisationService
            .query({ filter: 'idxorganisation-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAgreementOrganisation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAgreementOrganisation[]>) => response.body)
            )
            .subscribe(
                (res: IAgreementOrganisation[]) => {
                    if (!this.iDXOrganisation.organisationid || !this.iDXOrganisation.organisationid.id) {
                        this.organisationids = res;
                    } else {
                        this.agreementOrganisationService
                            .find(this.iDXOrganisation.organisationid.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAgreementOrganisation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAgreementOrganisation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAgreementOrganisation) => (this.organisationids = [subRes].concat(res)),
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
        if (this.iDXOrganisation.id !== undefined) {
            this.subscribeToSaveResponse(this.iDXOrganisationService.update(this.iDXOrganisation));
        } else {
            this.subscribeToSaveResponse(this.iDXOrganisationService.create(this.iDXOrganisation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIDXOrganisation>>) {
        result.subscribe((res: HttpResponse<IIDXOrganisation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
