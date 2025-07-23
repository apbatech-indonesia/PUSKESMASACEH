import { TestBed } from '@angular/core/testing';
import { GigiService } from './satusehat-gigi.service';

describe('ImunisasiService', () => {
  let service: GigiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
