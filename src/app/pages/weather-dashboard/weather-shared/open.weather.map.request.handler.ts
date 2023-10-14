import {Injectable} from '@angular/core';
import {OpenWeatherMapResponseMapper} from './open.weather.map.response.mapper';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {OpenWeatherMapRawHttpResponseInterface} from './open.weather.map.raw.http.response.interface';
import {OpenWeatherMapInterface} from './open.weather.map.interface';

@Injectable()
export class OpenWeatherMapRequestHandler {



  constructor(private httpClient: HttpClient,
              private openWeatherMapResponseMapper: OpenWeatherMapResponseMapper) {
  }

  public getOpenWeatherMapFiveDayForecast(item): Observable<OpenWeatherMapInterface> {
    //console.log('zipmo',item)
   let openWeatherMapUrl =  'https://api.openweathermap.org/data/2.5/forecast?' +
'q=' + item + '&units=imperial&APPID=120561a8beea4d20b1d345325b30cabf';
  //  let openWeatherMapUrl =  'https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&appid = 120561a8beea4d20b1d345325b30cabf';
    const openWeatherMapResponse: Observable<OpenWeatherMapRawHttpResponseInterface> = this.httpClient.get(openWeatherMapUrl)
      .catch(
        (err: HttpErrorResponse) => {
          console.error('An error occurred:', err.error);
          return Observable.of({});
        });
//console.log('weather check',openWeatherMapResponse)
    return this.openWeatherMapResponseMapper
      .getOpenWeatherMapResponseMap(openWeatherMapResponse);
  }

}
