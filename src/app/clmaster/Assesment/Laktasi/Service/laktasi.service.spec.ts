import { TestBed } from '@angular/core/testing';

import { LaktasiService } from './laktasi.service';

describe('LaktasiService', () => {
  let service: LaktasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaktasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
