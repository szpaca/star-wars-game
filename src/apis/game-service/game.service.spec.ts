import {TestBed} from '@angular/core/testing';
import {GameService} from './game.service';
import {SWAPI} from "../apis";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpErrorResponse} from "@angular/common/http";
import {
  mockPerson,
  mockPersonResource,
  mockResultResponse,
  mockStarship,
  mockStarshipResource
} from "../../shared/mocks/game.mocks";

describe('GameService', () => {
  let service: GameService;
  let httpController: HttpTestingController;
  const url = 'game-service/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SWAPI,
          useValue: 'game-service/api',
        }
      ]
    });
    service = TestBed.inject(GameService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getPeopleResults and return an array of results', () => {
    service.getPeopleResults().subscribe((res) => {
      expect(res).toEqual(mockResultResponse.results);
    });

    const req = httpController.expectOne(`${url}/people`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockResultResponse);
    httpController.verify();
  });

  it('should throw error on getPeopleResults call', () => {
    const emsg = '404 error';

    service.getPeopleResults().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpController.expectOne(`${url}/people`);
    req.flush(emsg, {status: 404, statusText: 'Not Found'});
  });

  it('should call getStarshipResults and return an array of results', () => {
    service.getStarshipResults().subscribe((res) => {
      expect(res).toEqual(mockResultResponse.results);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/starships`,
    });

    req.flush(mockResultResponse);
  });

  it('should throw error on getStarshipResults call', () => {
    const emsg = '404 error';

    service.getStarshipResults().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpController.expectOne(`${url}/starships`);
    req.flush(emsg, {status: 404, statusText: 'Not Found'});
  });

  it('should call getOnePerson and return an Person object', () => {
    const onePersonUrl = `${url}/onePersonUrl`;

    service.getOnePerson(onePersonUrl).subscribe((res) => {
      expect(res).toEqual(mockPerson);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: onePersonUrl,
    });

    req.flush({
      message: 'ok',
      result: mockPersonResource
    });
  });

  it('should throw error on getOnePerson call', () => {
    const emsg = '404 error';
    const onePersonUrl = `${url}/onePersonUrl`;

    service.getOneStarship(onePersonUrl).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpController.expectOne(onePersonUrl);
    req.flush(emsg, {status: 404, statusText: 'Not Found'});
  });

  it('should call getOneStarship and return an Starship object', () => {
    const oneStarshipUrl = `${url}/oneStarshipUrl`;

    service.getOneStarship(oneStarshipUrl).subscribe((res) => {
      expect(res).toEqual(mockStarship);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: oneStarshipUrl,
    });

    req.flush({
      message: 'ok',
      result: mockStarshipResource
    });
  });

  it('should throw error on getOneStarship call', () => {
    const emsg = '404 error';
    const oneStarshipUrl = `${url}/oneStarshipUrl`;

    service.getOneStarship(oneStarshipUrl).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpController.expectOne(oneStarshipUrl);
    req.flush(emsg, {status: 404, statusText: 'Not Found'});
  });


});
