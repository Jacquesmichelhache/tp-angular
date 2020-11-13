import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerBtnComponent } from './new-customer-btn.component';

describe('NewCustomerBtnComponent', () => {
  let component: NewCustomerBtnComponent;
  let fixture: ComponentFixture<NewCustomerBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
