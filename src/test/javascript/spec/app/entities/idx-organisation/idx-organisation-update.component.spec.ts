/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { IDXOrganisationUpdateComponent } from 'app/entities/idx-organisation/idx-organisation-update.component';
import { IDXOrganisationService } from 'app/entities/idx-organisation/idx-organisation.service';
import { IDXOrganisation } from 'app/shared/model/idx-organisation.model';

describe('Component Tests', () => {
    describe('IDXOrganisation Management Update Component', () => {
        let comp: IDXOrganisationUpdateComponent;
        let fixture: ComponentFixture<IDXOrganisationUpdateComponent>;
        let service: IDXOrganisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [IDXOrganisationUpdateComponent]
            })
                .overrideTemplate(IDXOrganisationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IDXOrganisationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IDXOrganisationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IDXOrganisation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iDXOrganisation = entity;
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
                    const entity = new IDXOrganisation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iDXOrganisation = entity;
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
