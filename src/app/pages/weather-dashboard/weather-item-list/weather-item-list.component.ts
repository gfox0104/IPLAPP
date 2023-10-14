import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-item-list',
  templateUrl: './weather-item-list.component.html'
})
export class WeatherItemListComponent implements OnInit {
  @Input() openWeatherMap;

  constructor() { }

  ngOnInit() {
  }

}
