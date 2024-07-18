import { TestBed } from '@angular/core/testing';

import { AssesmentAwalService } from './assesment-awal.service';

describe('AssesmentAwalService', () => {
  let service: AssesmentAwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentAwalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
