import { TestBed } from '@angular/core/testing';

import { AssesmentAnakService } from './assesment-anak.service';

describe('AssesmentAnakService', () => {
  let service: AssesmentAnakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentAnakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
