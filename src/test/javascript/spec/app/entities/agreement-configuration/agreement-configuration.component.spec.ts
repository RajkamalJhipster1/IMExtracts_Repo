/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementConfigurationComponent } from 'app/entities/agreement-configuration/agreement-configuration.component';
import { AgreementConfigurationService } from 'app/entities/agreement-configuration/agreement-configuration.service';
import { AgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

describe('Component Tests', () => {
    describe('AgreementConfiguration Management Component', () => {
        let comp: AgreementConfigurationComponent;
        let fixture: ComponentFixture<AgreementConfigurationComponent>;
        let service: AgreementConfigurationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementConfigurationComponent],
                providers: []
            })
                .overrideTemplate(AgreementConfigurationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementConfigurationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgreementConfiguration(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agreementConfigurations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
