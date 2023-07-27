import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakmicenjeUnosComponent } from './takmicenje-unos.component';

describe('TakmicenjeUnosComponent', () => {
  let component: TakmicenjeUnosComponent;
  let fixture: ComponentFixture<TakmicenjeUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakmicenjeUnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakmicenjeUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
