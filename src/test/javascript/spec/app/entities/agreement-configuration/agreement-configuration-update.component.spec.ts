/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementConfigurationUpdateComponent } from 'app/entities/agreement-configuration/agreement-configuration-update.component';
import { AgreementConfigurationService } from 'app/entities/agreement-configuration/agreement-configuration.service';
import { AgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

describe('Component Tests', () => {
    describe('AgreementConfiguration Management Update Component', () => {
        let comp: AgreementConfigurationUpdateComponent;
        let fixture: ComponentFixture<AgreementConfigurationUpdateComponent>;
        let service: AgreementConfigurationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementConfigurationUpdateComponent]
            })
                .overrideTemplate(AgreementConfigurationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementConfigurationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementConfigurationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgreementConfiguration(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreementConfiguration = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgreementConfiguration();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreementConfiguration = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
