import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPlazaComponent } from './layout-plaza.component';

describe('LayoutPlazaComponent', () => {
  let component: LayoutPlazaComponent;
  let fixture: ComponentFixture<LayoutPlazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPlazaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPlazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
