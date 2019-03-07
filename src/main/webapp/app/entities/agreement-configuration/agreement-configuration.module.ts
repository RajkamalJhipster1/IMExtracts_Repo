import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImExtractSharedModule } from 'app/shared';
import {
    AgreementConfigurationComponent,
    AgreementConfigurationDetailComponent,
    AgreementConfigurationUpdateComponent,
    AgreementConfigurationDeletePopupComponent,
    AgreementConfigurationDeleteDialogComponent,
    agreementConfigurationRoute,
    agreementConfigurationPopupRoute
} from './';

const ENTITY_STATES = [...agreementConfigurationRoute, ...agreementConfigurationPopupRoute];

@NgModule({
    imports: [ImExtractSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgreementConfigurationComponent,
        AgreementConfigurationDetailComponent,
        AgreementConfigurationUpdateComponent,
        AgreementConfigurationDeleteDialogComponent,
        AgreementConfigurationDeletePopupComponent
    ],
    entryComponents: [
        AgreementConfigurationComponent,
        AgreementConfigurationUpdateComponent,
        AgreementConfigurationDeleteDialogComponent,
        AgreementConfigurationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImExtractAgreementConfigurationModule {}
