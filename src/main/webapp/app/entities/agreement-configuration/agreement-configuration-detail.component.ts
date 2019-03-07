import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

@Component({
    selector: 'jhi-agreement-configuration-detail',
    templateUrl: './agreement-configuration-detail.component.html'
})
export class AgreementConfigurationDetailComponent implements OnInit {
    agreementConfiguration: IAgreementConfiguration;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreementConfiguration }) => {
            this.agreementConfiguration = agreementConfiguration;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
