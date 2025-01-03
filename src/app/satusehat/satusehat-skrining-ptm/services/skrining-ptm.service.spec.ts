import { TestBed } from '@angular/core/testing';
import { SkriningPTMService } from './skrining-ptm.service';

describe('ImunisasiService', () => {
  let service: SkriningPTMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkriningPTMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
