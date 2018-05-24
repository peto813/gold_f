import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundirMultModalComponent } from './fundir-mult-modal.component';

describe('FundirMultModalComponent', () => {
  let component: FundirMultModalComponent;
  let fixture: ComponentFixture<FundirMultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundirMultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundirMultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
