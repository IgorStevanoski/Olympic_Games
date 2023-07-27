import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportistaPregledComponent } from './sportista-pregled.component';

describe('SportistaPregledComponent', () => {
  let component: SportistaPregledComponent;
  let fixture: ComponentFixture<SportistaPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportistaPregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportistaPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
