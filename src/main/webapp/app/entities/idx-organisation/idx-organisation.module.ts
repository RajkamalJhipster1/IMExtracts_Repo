import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImExtractSharedModule } from 'app/shared';
import {
    IDXOrganisationComponent,
    IDXOrganisationDetailComponent,
    IDXOrganisationUpdateComponent,
    IDXOrganisationDeletePopupComponent,
    IDXOrganisationDeleteDialogComponent,
    iDXOrganisationRoute,
    iDXOrganisationPopupRoute
} from './';

const ENTITY_STATES = [...iDXOrganisationRoute, ...iDXOrganisationPopupRoute];

@NgModule({
    imports: [ImExtractSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IDXOrganisationComponent,
        IDXOrganisationDetailComponent,
        IDXOrganisationUpdateComponent,
        IDXOrganisationDeleteDialogComponent,
        IDXOrganisationDeletePopupComponent
    ],
    entryComponents: [
        IDXOrganisationComponent,
        IDXOrganisationUpdateComponent,
        IDXOrganisationDeleteDialogComponent,
        IDXOrganisationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImExtractIDXOrganisationModule {}
