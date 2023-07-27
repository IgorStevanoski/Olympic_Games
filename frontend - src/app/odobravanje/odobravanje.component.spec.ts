import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobravanjeComponent } from './odobravanje.component';

describe('OdobravanjeComponent', () => {
  let component: OdobravanjeComponent;
  let fixture: ComponentFixture<OdobravanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdobravanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobravanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
