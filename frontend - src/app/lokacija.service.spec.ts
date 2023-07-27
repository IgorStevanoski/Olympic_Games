import { TestBed } from '@angular/core/testing';

import { LokacijaService } from './lokacija.service';

describe('LokacijaService', () => {
  let service: LokacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
