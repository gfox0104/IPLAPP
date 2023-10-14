import {async, inject, TestBed} from '@angular/core/testing';
import {OpenWeatherMapResponseMapper} from './open.weather.map.response.mapper';
import {MockOpenWeatherMapHttpResponse} from '../test/mock.open.weather.map.http.response';
import {Observable} from 'rxjs/Observable';
import {OpenWeatherMapRequestHandler} from './open.weather.map.request.handler';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {OpenWeatherMapInterface} from './open.weather.map.interface';

describe('OpenWeatherMapRequestHandler', () => {

  beforeEach(async(
    () => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule
        ],
        providers: [
          OpenWeatherMapRequestHandler,
          OpenWeatherMapResponseMapper,
          HttpClient,
        ],
      });
    }));

  const url = 'http://someurl.com';
  it('getOpenWeatherMapFiveDayForecast, ' +
    'should return mapped open weather map response from valid open weather map http request',
    async(
      inject(
        [
          OpenWeatherMapRequestHandler,
          OpenWeatherMapResponseMapper,
          HttpClient,
          HttpTestingController
        ],
        (openWeatherMapRequestHandler: OpenWeatherMapRequestHandler,
         openWeatherMapResponseMapper: OpenWeatherMapResponseMapper,
         http: HttpClient,
         backend: HttpTestingController) => {
          spyOn(openWeatherMapResponseMapper, 'getOpenWeatherMapResponseMap').and.callFake(
            () => {
              return Observable.of(MockOpenWeatherMapHttpResponse.getMappedOpenWeatherMapResponse());
            });

          const openWeatherMapFiveDayForecast = openWeatherMapRequestHandler.getOpenWeatherMapFiveDayForecast();

          http.get(url).subscribe();
          const mockRequest = backend.expectOne({
            url: url,
            method: 'GET'
          });
          backend.verify();

          expect(mockRequest.cancelled).toBeFalsy();
          expect(mockRequest.request.responseType).toEqual('json');

          expect(openWeatherMapResponseMapper.getOpenWeatherMapResponseMap).toHaveBeenCalled();
          openWeatherMapFiveDayForecast.subscribe(
            (openWeatherMap: OpenWeatherMapInterface) => {
              expect(openWeatherMap)
                .toEqual(MockOpenWeatherMapHttpResponse.getMappedOpenWeatherMapResponse());
            }
          );
          mockRequest.flush(MockOpenWeatherMapHttpResponse.getMappedOpenWeatherMapResponse());
        })
    ));
});
