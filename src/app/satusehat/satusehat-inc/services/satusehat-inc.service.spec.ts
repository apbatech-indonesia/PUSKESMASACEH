import { TestBed } from '@angular/core/testing';
import { IncService } from './satusehat-inc.service';

describe('ImunisasiService', () => {
  let service: IncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
