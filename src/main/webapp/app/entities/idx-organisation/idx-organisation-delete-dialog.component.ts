import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIDXOrganisation } from 'app/shared/model/idx-organisation.model';
import { IDXOrganisationService } from './idx-organisation.service';

@Component({
    selector: 'jhi-idx-organisation-delete-dialog',
    templateUrl: './idx-organisation-delete-dialog.component.html'
})
export class IDXOrganisationDeleteDialogComponent {
    iDXOrganisation: IIDXOrganisation;

    constructor(
        protected iDXOrganisationService: IDXOrganisationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iDXOrganisationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iDXOrganisationListModification',
                content: 'Deleted an iDXOrganisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-idx-organisation-delete-popup',
    template: ''
})
export class IDXOrganisationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iDXOrganisation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IDXOrganisationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.iDXOrganisation = iDXOrganisation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/idx-organisation', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/idx-organisation', { outlets: { popup: null } }]);
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
