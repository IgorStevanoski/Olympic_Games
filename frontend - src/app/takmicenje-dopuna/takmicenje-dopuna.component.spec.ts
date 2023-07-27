import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakmicenjeDopunaComponent } from './takmicenje-dopuna.component';

describe('TakmicenjeDopunaComponent', () => {
  let component: TakmicenjeDopunaComponent;
  let fixture: ComponentFixture<TakmicenjeDopunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakmicenjeDopunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakmicenjeDopunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
