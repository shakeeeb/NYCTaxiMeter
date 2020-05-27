import { AppPage } from './app.po';
import { browser, by, element, logging, protractor } from 'protractor';

import { FareCalculationServiceService } from '../../src/app/shared/fare-calculation-service.service';
import { PriceModel } from 'src/app/shared/price-model.model';
import { Observable } from 'rxjs';
import { doesNotReject } from 'assert';

  var fs = require('fs');

describe('workspace-project App', () => {
  let page: AppPage;
  var units = element(by.id('numberOfUnits'))
  var dateTime = element(by.id('dateAndTime'))
  var miles = element(by.id('numberOfMilesBelowThreshold'))
  var minutes = element(by.id('numberOfMinutesAboveThreshold'))
  var submit = element(by.id('submitButton'));

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    debugger;

        // mock out the FareCalculationService
        let mockPrice : PriceModel = {
          Price : 9.75, 
          TripId: 'd39bef2e-3f17-49be-beee-a7cc2c1c75aa'
        }
    
        spyOn(
          FareCalculationServiceService.prototype, 'getPrice'
          ).and.returnValue(
            Observable.create( 
              observer => { 
              observer.next(mockPrice);
              observer.complete();
              }
            )
          );

    page.navigateTo();

    // Populate the form
    units.sendKeys(1);
    dateTime.sendKeys('10082010');
    dateTime.sendKeys(protractor.Key.TAB);
    dateTime.sendKeys('0530PM');
    miles.sendKeys(2);
    minutes.sendKeys(5);
    
    // click submit.
    submit.click();

    expect(element(by.id('priceDisplayText')).getText()).toContain('9.75');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
