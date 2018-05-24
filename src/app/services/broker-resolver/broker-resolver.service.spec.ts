import { TestBed, inject } from '@angular/core/testing';

import { BrokerResolverService } from './broker-resolver.service';

describe('BrokerResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrokerResolverService]
    });
  });

  it('should be created', inject([BrokerResolverService], (service: BrokerResolverService) => {
    expect(service).toBeTruthy();
  }));
});
