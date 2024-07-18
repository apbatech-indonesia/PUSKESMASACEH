import { TestBed } from '@angular/core/testing';

import { KebidananService } from './Kebidanan.service';

describe('KebidananService', () => {
  let service: KebidananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KebidananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
