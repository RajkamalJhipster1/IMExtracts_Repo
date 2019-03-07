import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgreementConfiguration } from 'app/shared/model/agreement-configuration.model';
import { AgreementConfigurationService } from './agreement-configuration.service';

@Component({
    selector: 'jhi-agreement-configuration-delete-dialog',
    templateUrl: './agreement-configuration-delete-dialog.component.html'
})
export class AgreementConfigurationDeleteDialogComponent {
    agreementConfiguration: IAgreementConfiguration;

    constructor(
        protected agreementConfigurationService: AgreementConfigurationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agreementConfigurationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agreementConfigurationListModification',
                content: 'Deleted an agreementConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agreement-configuration-delete-popup',
    template: ''
})
export class AgreementConfigurationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreementConfiguration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgreementConfigurationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.agreementConfiguration = agreementConfiguration;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/agreement-configuration', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/agreement-configuration', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
