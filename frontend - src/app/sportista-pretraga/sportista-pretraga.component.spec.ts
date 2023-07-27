import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportistaPretragaComponent } from './sportista-pretraga.component';

describe('SportistaPretragaComponent', () => {
  let component: SportistaPretragaComponent;
  let fixture: ComponentFixture<SportistaPretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportistaPretragaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportistaPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
