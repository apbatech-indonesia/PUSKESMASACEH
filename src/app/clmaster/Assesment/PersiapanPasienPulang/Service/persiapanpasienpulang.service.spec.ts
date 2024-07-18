import { TestBed } from '@angular/core/testing';

import { PersiapanPasienPulangService } from './persiapanpasienpulang.service';

describe('PersiapanPasienPulangService', () => {
  let service: PersiapanPasienPulangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersiapanPasienPulangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
