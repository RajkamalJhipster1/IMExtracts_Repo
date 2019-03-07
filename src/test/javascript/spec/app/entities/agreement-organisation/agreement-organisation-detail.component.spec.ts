/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementOrganisationDetailComponent } from 'app/entities/agreement-organisation/agreement-organisation-detail.component';
import { AgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

describe('Component Tests', () => {
    describe('AgreementOrganisation Management Detail Component', () => {
        let comp: AgreementOrganisationDetailComponent;
        let fixture: ComponentFixture<AgreementOrganisationDetailComponent>;
        const route = ({ data: of({ agreementOrganisation: new AgreementOrganisation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementOrganisationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgreementOrganisationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementOrganisationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agreementOrganisation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
