/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementOrganisationDeleteDialogComponent } from 'app/entities/agreement-organisation/agreement-organisation-delete-dialog.component';
import { AgreementOrganisationService } from 'app/entities/agreement-organisation/agreement-organisation.service';

describe('Component Tests', () => {
    describe('AgreementOrganisation Management Delete Component', () => {
        let comp: AgreementOrganisationDeleteDialogComponent;
        let fixture: ComponentFixture<AgreementOrganisationDeleteDialogComponent>;
        let service: AgreementOrganisationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementOrganisationDeleteDialogComponent]
            })
                .overrideTemplate(AgreementOrganisationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementOrganisationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementOrganisationService);
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
