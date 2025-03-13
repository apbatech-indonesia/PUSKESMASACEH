import { TestBed } from '@angular/core/testing';
import { PncService } from './satusehat-pnc.service';

describe('ImunisasiService', () => {
  let service: PncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
