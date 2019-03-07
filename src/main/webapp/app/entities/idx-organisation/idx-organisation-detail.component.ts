import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';

@Component({
    selector: 'jhi-idx-organisation-detail',
    templateUrl: './idx-organisation-detail.component.html'
})
export class IDXOrganisationDetailComponent implements OnInit {
    iDXOrganisation: IIDXOrganisation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iDXOrganisation }) => {
            this.iDXOrganisation = iDXOrganisation;
        });
    }

    previousState() {
        window.history.back();
    }
}
