import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactBtnComponent } from './new-contact-btn.component';

describe('NewContactBtnComponent', () => {
  let component: NewContactBtnComponent;
  let fixture: ComponentFixture<NewContactBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
