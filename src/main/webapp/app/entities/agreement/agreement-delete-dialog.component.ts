import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgreement } from 'app/shared/model/agreement.model';
import { AgreementService } from './agreement.service';

@Component({
    selector: 'jhi-agreement-delete-dialog',
    templateUrl: './agreement-delete-dialog.component.html'
})
export class AgreementDeleteDialogComponent {
    agreement: IAgreement;

    constructor(
        protected agreementService: AgreementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agreementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agreementListModification',
                content: 'Deleted an agreement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agreement-delete-popup',
    template: ''
})
export class AgreementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgreementDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.agreement = agreement;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/agreement', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/agreement', { outlets: { popup: null } }]);
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
