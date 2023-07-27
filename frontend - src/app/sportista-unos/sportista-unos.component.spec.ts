import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportistaUnosComponent } from './sportista-unos.component';

describe('SportistaUnosComponent', () => {
  let component: SportistaUnosComponent;
  let fixture: ComponentFixture<SportistaUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportistaUnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportistaUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
