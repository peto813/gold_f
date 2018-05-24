import { TestBed, inject } from '@angular/core/testing';

import { TransactionsResolverService } from './transactions-resolver.service';

describe('TransactionsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsResolverService]
    });
  });

  it('should be created', inject([TransactionsResolverService], (service: TransactionsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
