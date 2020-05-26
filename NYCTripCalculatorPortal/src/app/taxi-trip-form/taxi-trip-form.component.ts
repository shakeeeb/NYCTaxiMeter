import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FareCalculationServiceService } from '../shared/fare-calculation-service.service';
import { NYCTaxiTripModel } from '../shared/nyctaxi-trip-model.model';
import { v4 as uuidv4 } from 'uuid';
import { PriceModel } from '../shared/price-model.model';

@Component({
  selector: 'app-taxi-trip-form',
  templateUrl: './taxi-trip-form.component.html',
  styleUrls: ['./taxi-trip-form.component.css']
})
export class TaxiTripFormComponent implements OnInit {

  // need to validate and compose inputs.
  taxiTripForm: FormGroup;
  private taxiTripModel: NYCTaxiTripModel = new NYCTaxiTripModel();
  public priceResult: PriceModel = new PriceModel();
  public showPrice: boolean = false;

  constructor(private _fb : FormBuilder, private _fareCalculator: FareCalculationServiceService) { }

  ngOnInit(): void {
    this.taxiTripForm = this._fb.group({
      numberOfUnits: ['', [Validators.required, Validators.pattern('^\\d*$'), Validators.min(1)]],
      dateAndTime: ['', [Validators.required]],
      numberOfMilesBelowThreshold: ['', [Validators.required, Validators.pattern('^((\\d+(\\.\\d*)?)|(\\.\\d+))$'), Validators.min(0)]],
      numberOfMinutesAboveThreshold: ['', [Validators.required, Validators.pattern('^((\\d+(\\.\\d*)?)|(\\.\\d+))$'), Validators.min(0)]]
    });
  }

  onSubmit(){
    if(this.taxiTripForm.valid){

      // Then create a model to send to the http service
      this.taxiTripModel = <NYCTaxiTripModel> 
      { 
        TripId: uuidv4(), 
        NumberOfMinutesTraveledAboveThreshold: this.taxiTripForm.get('numberOfMinutesAboveThreshold').value as number,
        NumberOfMilesTraveledBelowThreshold: this.taxiTripForm.get('numberOfMilesBelowThreshold').value as number, 
        StartTime: this.taxiTripForm.get('dateAndTime').value as Date,
        NumberOfUnits: this.taxiTripForm.get('numberOfUnits').value as number
      }

      //alert(JSON.stringify(this.taxiTripModel, null, 4))

      // subscribe to the service 
      this._fareCalculator
        .getPrice(this.taxiTripModel)
        .subscribe( 
                  (value) => {this.priceResult = value;},
                  (error) => {this.priceResult = error;}
        )

      // display the price.
      this.showPrice = true;

      //alert(JSON.stringify(this.priceResult, null, 4))
    } else {
      //console.log(JSON.stringify(this.taxiTripForm));
      alert('this taxi trip form is invalid');
    }
  }

}
