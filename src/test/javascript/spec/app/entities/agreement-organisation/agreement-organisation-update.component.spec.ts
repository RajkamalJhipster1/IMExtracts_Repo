/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementOrganisationUpdateComponent } from 'app/entities/agreement-organisation/agreement-organisation-update.component';
import { AgreementOrganisationService } from 'app/entities/agreement-organisation/agreement-organisation.service';
import { AgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

describe('Component Tests', () => {
    describe('AgreementOrganisation Management Update Component', () => {
        let comp: AgreementOrganisationUpdateComponent;
        let fixture: ComponentFixture<AgreementOrganisationUpdateComponent>;
        let service: AgreementOrganisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementOrganisationUpdateComponent]
            })
                .overrideTemplate(AgreementOrganisationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementOrganisationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementOrganisationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgreementOrganisation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreementOrganisation = entity;
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
                    const entity = new AgreementOrganisation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreementOrganisation = entity;
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
