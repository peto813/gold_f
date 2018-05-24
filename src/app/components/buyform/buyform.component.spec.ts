import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyformComponent } from './buyform.component';

describe('BuyformComponent', () => {
  let component: BuyformComponent;
  let fixture: ComponentFixture<BuyformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
