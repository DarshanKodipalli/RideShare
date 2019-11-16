import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: Http) { }

  dailyForecast() {
    return this._http.get("http://www.mocky.io/v2/5c0be3712f0000520013ec76?mocky-delay=3000ms");
  }
}
