import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeMultModalComponent } from './analyze-mult-modal.component';

describe('AnalyzeMultModalComponent', () => {
  let component: AnalyzeMultModalComponent;
  let fixture: ComponentFixture<AnalyzeMultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeMultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeMultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
