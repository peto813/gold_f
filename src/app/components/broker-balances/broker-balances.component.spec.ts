import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerBalancesComponent } from './broker-balances.component';

describe('BrokerBalancesComponent', () => {
  let component: BrokerBalancesComponent;
  let fixture: ComponentFixture<BrokerBalancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerBalancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
