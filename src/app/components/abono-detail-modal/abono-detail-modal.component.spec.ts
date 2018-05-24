import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonoDetailModalComponent } from './abono-detail-modal.component';

describe('AbonoDetailModalComponent', () => {
  let component: AbonoDetailModalComponent;
  let fixture: ComponentFixture<AbonoDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonoDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonoDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
