import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

@Component({
    selector: 'jhi-agreement-organisation-detail',
    templateUrl: './agreement-organisation-detail.component.html'
})
export class AgreementOrganisationDetailComponent implements OnInit {
    agreementOrganisation: IAgreementOrganisation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreementOrganisation }) => {
            this.agreementOrganisation = agreementOrganisation;
        });
    }

    previousState() {
        window.history.back();
    }
}
