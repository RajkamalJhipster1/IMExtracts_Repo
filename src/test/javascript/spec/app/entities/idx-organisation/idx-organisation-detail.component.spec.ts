/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImExtractTestModule } from '../../../test.module';
import { IDXOrganisationDetailComponent } from 'app/entities/idx-organisation/idx-organisation-detail.component';
import { IDXOrganisation } from 'app/shared/model/idx-organisation.model';

describe('Component Tests', () => {
    describe('IDXOrganisation Management Detail Component', () => {
        let comp: IDXOrganisationDetailComponent;
        let fixture: ComponentFixture<IDXOrganisationDetailComponent>;
        const route = ({ data: of({ iDXOrganisation: new IDXOrganisation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [IDXOrganisationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IDXOrganisationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IDXOrganisationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iDXOrganisation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
