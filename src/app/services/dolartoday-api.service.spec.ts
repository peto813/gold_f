import { TestBed, inject } from '@angular/core/testing';

import { DolartodayApiService } from './dolartoday-api.service';

describe('DolartodayApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DolartodayApiService]
    });
  });

  it('should be created', inject([DolartodayApiService], (service: DolartodayApiService) => {
    expect(service).toBeTruthy();
  }));
});
