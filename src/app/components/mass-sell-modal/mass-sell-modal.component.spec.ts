import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassSellModalComponent } from './mass-sell-modal.component';

describe('MassSellModalComponent', () => {
  let component: MassSellModalComponent;
  let fixture: ComponentFixture<MassSellModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassSellModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassSellModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
