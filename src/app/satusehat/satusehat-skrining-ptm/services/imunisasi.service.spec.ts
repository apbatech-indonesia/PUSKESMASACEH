import { TestBed } from '@angular/core/testing';

import { ImunisasiService } from './imunisasi.service';

describe('ImunisasiService', () => {
  let service: ImunisasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImunisasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
