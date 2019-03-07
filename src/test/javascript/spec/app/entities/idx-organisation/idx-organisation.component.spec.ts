/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImExtractTestModule } from '../../../test.module';
import { IDXOrganisationComponent } from 'app/entities/idx-organisation/idx-organisation.component';
import { IDXOrganisationService } from 'app/entities/idx-organisation/idx-organisation.service';
import { IDXOrganisation } from 'app/shared/model/idx-organisation.model';

describe('Component Tests', () => {
    describe('IDXOrganisation Management Component', () => {
        let comp: IDXOrganisationComponent;
        let fixture: ComponentFixture<IDXOrganisationComponent>;
        let service: IDXOrganisationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImExtractTestModule],
                declarations: [IDXOrganisationComponent],
                providers: []
            })
                .overrideTemplate(IDXOrganisationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IDXOrganisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IDXOrganisationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IDXOrganisation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.iDXOrganisations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
