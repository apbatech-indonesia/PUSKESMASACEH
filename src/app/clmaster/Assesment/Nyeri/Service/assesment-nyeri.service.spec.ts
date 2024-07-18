import { TestBed } from '@angular/core/testing';

import { AssesmentNyeriService } from './assesment-nyeri.service';

describe('AssesmentNyeriService', () => {
  let service: AssesmentNyeriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentNyeriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
