import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WeatherItemListComponent} from './weather-item-list.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherIconsModule} from 'ngx-icons';
import {OpenWeatherMapRequestHandler} from '../../shared/open.weather.map.request.handler';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OpenWeatherMapResponseMapper} from '../../shared/open.weather.map.response.mapper';
import {RouterTestingModule} from '@angular/router/testing';
import {MockOpenWeatherMapHttpResponse} from '../../test/mock.open.weather.map.http.response';
import {NativeElementAssertionHandler} from '../../test/native.element.assertion.handler';

describe('WeatherItemListComponent', () => {
  let component: WeatherItemListComponent;
  let fixture: ComponentFixture<WeatherItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherItemListComponent],
      providers: [OpenWeatherMapRequestHandler, OpenWeatherMapResponseMapper],
      imports: [
        RouterTestingModule,
        WeatherIconsModule,
        HttpClientModule,
        HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather item list when open map weather item list is valid', () => {
    component.ngOnInit();
    component.openWeatherMap = MockOpenWeatherMapHttpResponse.getMappedOpenWeatherMapResponse();
    fixture.detectChanges();

    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDate0', 'Mon 29 Jan 2018');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#dailySummaryHeading0', 'Daily summary');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDescription0', 'light rain');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherTemperature0', '11.6 - 11.6 celsius');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherWindSpeed0', '7.62 meter/sec');

    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDate1', 'Tue 30 Jan 2018');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#dailySummaryHeading1', 'Daily summary');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDescription1', 'clear sky');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherTemperature1', '6.22 - 6.22 celsius');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherWindSpeed1', '2.02 meter/sec');

    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDate2', 'Wed 31 Jan 2018');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#dailySummaryHeading2', 'Daily summary');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDescription2', 'light rain');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherTemperature2', '6.15 - 6.15 celsius');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherWindSpeed2', '7.01 meter/sec');

    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDate3', 'Thu 1 Feb 2018');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#dailySummaryHeading3', 'Daily summary');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDescription3', 'light rain');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherTemperature3', '5.02 - 5.02 celsius');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherWindSpeed3', '8.16 meter/sec');

    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDate4', 'Fri 2 Feb 2018');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#dailySummaryHeading4', 'Daily summary');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherDescription4', 'clear sky');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherTemperature4', '5.63 - 5.63 celsius');
    NativeElementAssertionHandler.assertNativeElementTextContentContains(fixture, '#weatherWindSpeed4', '2.96 meter/sec');
  });

  it('should display error message when open map weather item list is invalid', () => {
    component.ngOnInit();
    component.openWeatherMap = {};
    fixture.detectChanges();

    NativeElementAssertionHandler.assertNativeElementTextContentContains(
      fixture,
      '#connectionError',
      'Unable to retrieve Open Weather Map data, please check your Internet connection.'
    );
  });
});
