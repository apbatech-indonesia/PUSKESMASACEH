import { TestBed } from '@angular/core/testing';

import { FarmasijualService } from './farmasijual.service';

describe('FarmasijualService', () => {
  let service: FarmasijualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmasijualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
