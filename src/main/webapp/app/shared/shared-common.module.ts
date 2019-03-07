import { NgModule } from '@angular/core';

import { ImExtractSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ImExtractSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ImExtractSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ImExtractSharedCommonModule {}
