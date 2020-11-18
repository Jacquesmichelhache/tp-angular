import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFiestaComponent } from './content-fiesta.component';

describe('ContentFiestaComponent', () => {
  let component: ContentFiestaComponent;
  let fixture: ComponentFixture<ContentFiestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFiestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFiestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
