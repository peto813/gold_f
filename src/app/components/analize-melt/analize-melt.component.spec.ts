import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizeMeltComponent } from './analize-melt.component';

describe('AnalizeMeltComponent', () => {
  let component: AnalizeMeltComponent;
  let fixture: ComponentFixture<AnalizeMeltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizeMeltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizeMeltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
