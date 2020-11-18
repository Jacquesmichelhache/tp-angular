import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayHouseHomeComponent } from './play-house-home.component';

describe('PlayHouseHomeComponent', () => {
  let component: PlayHouseHomeComponent;
  let fixture: ComponentFixture<PlayHouseHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayHouseHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayHouseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
