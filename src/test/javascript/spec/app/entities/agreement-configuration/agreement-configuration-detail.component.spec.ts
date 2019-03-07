/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementConfigurationDetailComponent } from 'app/entities/agreement-configuration/agreement-configuration-detail.component';
import { AgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

describe('Component Tests', () => {
    describe('AgreementConfiguration Management Detail Component', () => {
        let comp: AgreementConfigurationDetailComponent;
        let fixture: ComponentFixture<AgreementConfigurationDetailComponent>;
        const route = ({ data: of({ agreementConfiguration: new AgreementConfiguration(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementConfigurationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgreementConfigurationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementConfigurationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agreementConfiguration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
