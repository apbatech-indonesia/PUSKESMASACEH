import { TestBed } from '@angular/core/testing';

import { KeperawatanService } from './Keperawatan.service';

describe('KeperawatanService', () => {
  let service: KeperawatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeperawatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
