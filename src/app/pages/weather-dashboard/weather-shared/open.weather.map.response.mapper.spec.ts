import {async, inject, TestBed} from '@angular/core/testing';
import {OpenWeatherMapResponseMapper} from './open.weather.map.response.mapper';
import {MockOpenWeatherMapHttpResponse} from '../test/mock.open.weather.map.http.response';
import {Observable} from 'rxjs/Observable';
import {OpenWeatherMapRawHttpResponseInterface} from './open.weather.map.raw.http.response.interface';
import {OpenWeatherMapInterface} from './open.weather.map.interface';

describe('OpenWeatherMapResponseMapper', () => {

  beforeEach(async(
    () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          OpenWeatherMapResponseMapper,
        ],
      });
    }));


  const mockOpeWeatherMapResponse: OpenWeatherMapRawHttpResponseInterface = {
    list: MockOpenWeatherMapHttpResponse.getRawOpenWeatherMapList()
  };

  it('getOpenWeatherMapResponseMap, ' +
    'should return mapped open weather map response from valid open weather map http response',
    async(inject([OpenWeatherMapResponseMapper],
      (openWeatherMapResponseMapper: OpenWeatherMapResponseMapper) => {
        const openWeatherMapResponseMap = openWeatherMapResponseMapper.getOpenWeatherMapResponseMap(
          Observable.of(mockOpeWeatherMapResponse)
        );

        openWeatherMapResponseMap.subscribe(
          (openWeatherMap: OpenWeatherMapInterface) => {
            expect(openWeatherMap)
              .toEqual(MockOpenWeatherMapHttpResponse.getMappedOpenWeatherMapResponse());
          }
        );
      })
    ));

  it('getOpenWeatherMapResponseMap, ' +
    'should return empty open weather map response, ' +
    'when open weather map http response is invalid',
    async(inject([OpenWeatherMapResponseMapper],
      (openWeatherMapResponseMapper: OpenWeatherMapResponseMapper) => {
        const openWeatherMapResponseMap = openWeatherMapResponseMapper.getOpenWeatherMapResponseMap(
          Observable.of({})
        );

        openWeatherMapResponseMap.subscribe(
          (openWeatherMap: OpenWeatherMapInterface) => {
            expect(openWeatherMap)
              .toEqual({openWeatherMapItemList: []});
          }
        );
      })
    ));
});
