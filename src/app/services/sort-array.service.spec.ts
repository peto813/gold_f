import { TestBed, inject } from '@angular/core/testing';

import { SortArrayService } from './sort-array.service';

describe('SortArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortArrayService]
    });
  });

  it('should be created', inject([SortArrayService], (service: SortArrayService) => {
    expect(service).toBeTruthy();
  }));
});
