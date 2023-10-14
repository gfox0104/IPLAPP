import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { CommonPhotosMetaComponent } from "./common-photos-meta.component";
import { SharedModule } from 'src/app/shared.module';
import {WeatherItemListComponent } from '../../weather-dashboard/weather-item-list/weather-item-list.component'
import { OpenWeatherMapResponseMapper } from "../../weather-dashboard/weather-shared/open.weather.map.response.mapper";
import { OpenWeatherMapRequestHandler } from "../../weather-dashboard/weather-shared/open.weather.map.request.handler";




@NgModule({
  declarations: [CommonPhotosMetaComponent,WeatherItemListComponent],
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule,

  ],
  exports: [
    CommonPhotosMetaComponent,
    WeatherItemListComponent
  ],

  providers: [OpenWeatherMapRequestHandler, OpenWeatherMapResponseMapper],
  bootstrap: [CommonPhotosMetaComponent]
})

export class CommonPhotosMetaModule {}
