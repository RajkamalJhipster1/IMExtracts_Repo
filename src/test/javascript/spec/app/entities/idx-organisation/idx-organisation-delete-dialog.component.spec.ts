/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImExtractTestModule } from '../../../test.module';
import { IDXOrganisationDeleteDialogComponent } from 'app/entities/idx-organisation/idx-organisation-delete-dialog.component';
import { IDXOrganisationService } from 'app/entities/idx-organisation/idx-organisation.service';

describe('Component Tests', () => {
    describe('IDXOrganisation Management Delete Component', () => {
        let comp: IDXOrganisationDeleteDialogComponent;
        let fixture: ComponentFixture<IDXOrganisationDeleteDialogComponent>;
        let service: IDXOrganisationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [IDXOrganisationDeleteDialogComponent]
            })
                .overrideTemplate(IDXOrganisationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IDXOrganisationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IDXOrganisationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
