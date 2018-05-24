import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDatesComponent } from './search-dates.component';

describe('SearchDatesComponent', () => {
  let component: SearchDatesComponent;
  let fixture: ComponentFixture<SearchDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
