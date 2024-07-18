import { TestBed } from '@angular/core/testing';

import { PersetujuanTindakanMedisService } from './persetujuantindakanmedis.service';

describe('PersetujuanTindakanMedisService', () => {
  let service: PersetujuanTindakanMedisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersetujuanTindakanMedisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
