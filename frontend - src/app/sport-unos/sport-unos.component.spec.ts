import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportUnosComponent } from './sport-unos.component';

describe('SportUnosComponent', () => {
  let component: SportUnosComponent;
  let fixture: ComponentFixture<SportUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportUnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
