import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FareCalculationServiceService } from './fare-calculation-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('FareCalculationServiceService', () => {
  let service: FareCalculationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FareCalculationServiceService]
    });
    service = TestBed.inject(FareCalculationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
