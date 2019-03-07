/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementDeleteDialogComponent } from 'app/entities/agreement/agreement-delete-dialog.component';
import { AgreementService } from 'app/entities/agreement/agreement.service';

describe('Component Tests', () => {
    describe('Agreement Management Delete Component', () => {
        let comp: AgreementDeleteDialogComponent;
        let fixture: ComponentFixture<AgreementDeleteDialogComponent>;
        let service: AgreementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementDeleteDialogComponent]
            })
                .overrideTemplate(AgreementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementService);
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
