import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'idx-organisation',
                loadChildren: './idx-organisation/idx-organisation.module#ImExtractIDXOrganisationModule'
            },
            {
                path: 'agreement',
                loadChildren: './agreement/agreement.module#ImExtractAgreementModule'
            },
            {
                path: 'agreement-organisation',
                loadChildren: './agreement-organisation/agreement-organisation.module#ImExtractAgreementOrganisationModule'
            },
            {
                path: 'agreement-configuration',
                loadChildren: './agreement-configuration/agreement-configuration.module#ImExtractAgreementConfigurationModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImExtractEntityModule {}
