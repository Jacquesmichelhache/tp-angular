import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogTabComponent } from './edit-dialog-tab.component';

describe('EditDialogTabComponent', () => {
  let component: EditDialogTabComponent;
  let fixture: ComponentFixture<EditDialogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
