import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from './agreement-organisation.service';

@Component({
    selector: 'jhi-agreement-organisation-delete-dialog',
    templateUrl: './agreement-organisation-delete-dialog.component.html'
})
export class AgreementOrganisationDeleteDialogComponent {
    agreementOrganisation: IAgreementOrganisation;

    constructor(
        protected agreementOrganisationService: AgreementOrganisationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agreementOrganisationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agreementOrganisationListModification',
                content: 'Deleted an agreementOrganisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agreement-organisation-delete-popup',
    template: ''
})
export class AgreementOrganisationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreementOrganisation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgreementOrganisationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.agreementOrganisation = agreementOrganisation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/agreement-organisation', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/agreement-organisation', { outlets: { popup: null } }]);
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
