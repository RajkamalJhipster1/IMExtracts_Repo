/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImExtractTestModule } from '../../../test.module';
import { AgreementOrganisationComponent } from 'app/entities/agreement-organisation/agreement-organisation.component';
import { AgreementOrganisationService } from 'app/entities/agreement-organisation/agreement-organisation.service';
import { AgreementOrganisation } from 'app/shared/model/agreement-organisation.model';

describe('Component Tests', () => {
    describe('AgreementOrganisation Management Component', () => {
        let comp: AgreementOrganisationComponent;
        let fixture: ComponentFixture<AgreementOrganisationComponent>;
        let service: AgreementOrganisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [AgreementOrganisationComponent],
                providers: []
            })
                .overrideTemplate(AgreementOrganisationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementOrganisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementOrganisationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgreementOrganisation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agreementOrganisations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
