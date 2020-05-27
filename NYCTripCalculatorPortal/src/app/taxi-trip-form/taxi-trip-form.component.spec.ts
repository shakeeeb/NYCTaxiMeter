import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TaxiTripFormComponent } from './taxi-trip-form.component';
import { ReactiveFormsModule, FormsModule, EmailValidator } from '@angular/forms';

import { FareCalculationServiceService } from '../shared/fare-calculation-service.service';
import { NYCTaxiTripModel } from '../shared/nyctaxi-trip-model.model';
import { PriceModel } from '../shared/price-model.model';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockFareCalculationService extends FareCalculationServiceService {
  getPrice(model: NYCTaxiTripModel): Observable<PriceModel>
  {
    let mockPrice : PriceModel = {
      Price : 10.00, 
      TripId: 'd39bef2e-3f17-49be-beee-a7cc2c1c75aa'
    }

    return Observable.create( observer => { 
      observer.next(mockPrice);
      observer.complete();
    })
  }
}

describe('TaxiTripFormComponent', () => {
  let component: TaxiTripFormComponent;
  let fixture: ComponentFixture<TaxiTripFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [ TaxiTripFormComponent ],
      providers: [FareCalculationServiceService]
    });
    TestBed.overrideComponent(
      TaxiTripFormComponent,
      {set: {providers: [{provide: FareCalculationServiceService, useClass:MockFareCalculationService}]}}
    );
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test a form submission
  // how do i mock a service? 

  it('should be invalid when empty', () => {
    expect(component.taxiTripForm.valid).toBeFalsy();
  });

  it('should reject an empty date', () => {
    let date = component.taxiTripForm.controls['dateAndTime'];
    expect(date.valid).toBeFalsy();
    component.ngOnInit();

    // should reject an empty date time.
    let errors = {};
    errors = date.errors || {};
    expect(errors['required']).toBeTruthy();

    date.setValue('2010-10-08T17:30');
    expect(date.valid).toBeTruthy();

    // since the input type is datetime-local, a user shouldnt be able to input a wrong datetime
    // however writing the validator for that gets kind of complicated, it would be a pattern validator with specific regex
    // something along these lines ^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$ but the form input and the date itself are different so
    // if i had some more time i would probably do that.
  });

  it('should reject non positive number of units', () => {
    let numUnits = component.taxiTripForm.controls['numberOfUnits'];
    expect(numUnits.valid).toBeFalsy();
    component.ngOnInit();

    // cannot be empty
    let errors = {};
    errors = numUnits.errors || {};
    expect(errors['required']).toBeTruthy();

    // cannot be zero or negative
    numUnits.setValue(0);
    errors = numUnits.errors || {};
    expect(errors['min']).toBeFalsy;

    numUnits.setValue(-1);
    errors = numUnits.errors || {};
    expect(numUnits.valid).toBeFalsy();

    // cannot be a non-number
    numUnits.setValue("testy");
    expect(numUnits.valid).toBeFalsy();
  });

  it('should accept a positive number of units', () => {
    let numUnits = component.taxiTripForm.controls['numberOfUnits'];
    component.ngOnInit();
    // a valid number is positive.
    // not sure if there's an upper bound for number of passengers? 
    // i suppose the max depends on the size of the car

    numUnits.setValue(2);
    expect(numUnits.valid).toBeTruthy();
  });

  it('should reject a negative number of minutes above threshold', () => {
    let minutes = component.taxiTripForm.controls['numberOfMinutesAboveThreshold'];
    component.ngOnInit();
    // a valid number is positive.

    minutes.setValue(-2);
    expect(minutes.valid).toBeFalsy();

    minutes.setValue(3);
    expect(minutes.valid).toBeTruthy();

    minutes.setValue(3.3);
    expect(minutes.valid).toBeTruthy();
  });

  it('should reject a negative number of miles below threshold', () => {
    let miles = component.taxiTripForm.controls['numberOfMilesBelowThreshold'];
    component.ngOnInit();
    // a valid number is positive.

    miles.setValue(-2);
    expect(miles.valid).toBeFalsy();

    miles.setValue(3);
    expect(miles.valid).toBeTruthy();

    miles.setValue(3.3);
    expect(miles.valid).toBeTruthy();
  });

  it('should submit a completed form', () => {
    component.taxiTripForm.controls['numberOfUnits'].setValue(2);
    component.taxiTripForm.controls['dateAndTime'].setValue('2010-10-08T17:30');
    component.taxiTripForm.controls['numberOfMilesBelowThreshold'].setValue(2);
    component.taxiTripForm.controls['numberOfMinutesAboveThreshold'].setValue(5);    // set all values


    // submit and expect the showprice value to be true
    expect(component.taxiTripForm.valid).toBeTruthy();
    component.onSubmit();
    expect(component.priceResult).toBeTruthy();
  });
});
