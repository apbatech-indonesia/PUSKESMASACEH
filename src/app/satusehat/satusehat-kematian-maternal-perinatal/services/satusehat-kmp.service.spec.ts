import { TestBed } from '@angular/core/testing';
import { KmpService } from './satusehat-kmp.service';

describe('KmpService', () => {
  let service: KmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
