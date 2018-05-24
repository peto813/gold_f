import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerFormComponent } from './add-broker-form.component';

describe('AddBrokerFormComponent', () => {
  let component: AddBrokerFormComponent;
  let fixture: ComponentFixture<AddBrokerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrokerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrokerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
