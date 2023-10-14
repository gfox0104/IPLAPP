import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {OpenWeatherMapItemInterface} from './open.weather.map.item.interface';
import {OpenWeatherMapRawHttpResponseInterface} from './open.weather.map.raw.http.response.interface';
import {OpenWeatherMapInterface} from './open.weather.map.interface';
import { anyChanged } from '@progress/kendo-angular-common';

@Injectable()
export class OpenWeatherMapResponseMapper {
  private openWeatherMapItems: OpenWeatherMapItemInterface[] = [];

  public getOpenWeatherMapResponseMap(

    openWeatherMapHttpResponse: Observable<OpenWeatherMapRawHttpResponseInterface>
  ): Observable<OpenWeatherMapInterface> {

    return openWeatherMapHttpResponse.map(
      (openWeatherMapResponse: OpenWeatherMapRawHttpResponseInterface) => {
        if (!openWeatherMapResponse || !openWeatherMapResponse.list) {
          return {openWeatherMapItemList: []};
        } else {
          return this.getWeatherMapItemList(openWeatherMapResponse);
        }
      }
    );
  }

  private getWeatherMapItemList(openWeatherMapResponse: OpenWeatherMapRawHttpResponseInterface): OpenWeatherMapInterface {
    //debugger
    this.openWeatherMapItems = [];
    //console.log('mo',openWeatherMapResponse)
    openWeatherMapResponse.list.forEach(
      (rawWeatherItem: any) => {
        if (rawWeatherItem && rawWeatherItem['dt_txt'].includes('12:00')) {
          this.openWeatherMapItems.push(this.getWeatherMapItem(rawWeatherItem));
        }
      });
    return {openWeatherMapItemList: this.openWeatherMapItems};
  }

  private getWeatherMapItem(rawWeatherItem: any): OpenWeatherMapItemInterface {
   
   
   
    return {
      dateTime: rawWeatherItem['dt_txt'],
      weatherMain: rawWeatherItem['weather'][0]['main'],
      weatherDescription: rawWeatherItem['weather'][0]['description'],
      windSpeed: rawWeatherItem['wind']['speed'],
      tempMin: rawWeatherItem['main']['temp_min'],
      tempMax: rawWeatherItem['main']['temp_max'],
      humidity: rawWeatherItem['main']['humidity'],
      visibility: rawWeatherItem['visibility']
    };
  }
}
