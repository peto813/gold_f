import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingBrokerComponent } from './add-existing-broker.component';

describe('AddExistingBrokerComponent', () => {
  let component: AddExistingBrokerComponent;
  let fixture: ComponentFixture<AddExistingBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
