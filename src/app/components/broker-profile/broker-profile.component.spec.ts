import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerProfileComponent } from './broker-profile.component';

describe('BrokerProfileComponent', () => {
  let component: BrokerProfileComponent;
  let fixture: ComponentFixture<BrokerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
