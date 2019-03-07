/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementConfigurationDeleteDialogComponent } from 'app/entities/agreement-configuration/agreement-configuration-delete-dialog.component';
import { AgreementConfigurationService } from 'app/entities/agreement-configuration/agreement-configuration.service';

describe('Component Tests', () => {
    describe('AgreementConfiguration Management Delete Component', () => {
        let comp: AgreementConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<AgreementConfigurationDeleteDialogComponent>;
        let service: AgreementConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementConfigurationDeleteDialogComponent]
            })
                .overrideTemplate(AgreementConfigurationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementConfigurationService);
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
