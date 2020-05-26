import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceModel } from './price-model.model';
import { NYCTaxiTripModel } from './nyctaxi-trip-model.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FareCalculationServiceService {
  apiUrl = 'https://localhost:44314/api/NYCTripCalculation/PostPrice';

  constructor(private _http: HttpClient) { }

  getPrice(model: NYCTaxiTripModel): Observable<PriceModel>
  {
    return this._http.post<PriceModel>(this.apiUrl, model);
  }
}
