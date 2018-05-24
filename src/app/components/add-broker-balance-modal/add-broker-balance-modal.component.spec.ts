import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerBalanceModalComponent } from './add-broker-balance-modal.component';

describe('AddBrokerBalanceModalComponent', () => {
  let component: AddBrokerBalanceModalComponent;
  let fixture: ComponentFixture<AddBrokerBalanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrokerBalanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrokerBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
