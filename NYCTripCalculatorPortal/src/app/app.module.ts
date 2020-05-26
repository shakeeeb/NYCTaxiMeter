import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaxiTripFormComponent } from './taxi-trip-form/taxi-trip-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FareCalculationServiceService } from './shared/fare-calculation-service.service';
import { PriceDisplayComponent } from './price-display/price-display.component';


@NgModule({
  declarations: [
    AppComponent,
    TaxiTripFormComponent,
    PriceDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FareCalculationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
