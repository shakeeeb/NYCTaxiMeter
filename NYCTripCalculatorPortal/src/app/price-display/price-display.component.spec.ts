import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDisplayComponent } from './price-display.component';
import { PriceModel } from '../shared/price-model.model';

describe('PriceDisplayComponent', () => {
  let component: PriceDisplayComponent;
  let fixture: ComponentFixture<PriceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.priceModel = {
      Price : 10.00, 
      TripId : 'd39bef2e-3f17-49be-beee-a7cc2c1c75aa'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
