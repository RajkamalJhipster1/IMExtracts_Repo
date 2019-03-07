/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AgreementConfigurationService } from 'app/entities/agreement-configuration/agreement-configuration.service';
import { IAgreementConfiguration, AgreementConfiguration } from 'app/shared/model/agreement-configuration.model';

describe('Service Tests', () => {
    describe('AgreementConfiguration Service', () => {
        let injector: TestBed;
        let service: AgreementConfigurationService;
        let httpMock: HttpTestingController;
        let elemDefault: IAgreementConfiguration;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AgreementConfigurationService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new AgreementConfiguration(0, 'image/png', 'AAAAAAA', false, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        createddate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AgreementConfiguration', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        createddate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createddate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new AgreementConfiguration(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AgreementConfiguration', async () => {
                const returnedFromService = Object.assign(
                    {
                        configuration: 'BBBBBB',
                        isActive: true,
                        createddate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createddate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AgreementConfiguration', async () => {
                const returnedFromService = Object.assign(
                    {
                        configuration: 'BBBBBB',
                        isActive: true,
                        createddate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createddate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AgreementConfiguration', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
