import { TestBed } from '@angular/core/testing';
import { GiziService } from './satusehat-gizi.service';

describe('ImunisasiService', () => {
  let service: GiziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
