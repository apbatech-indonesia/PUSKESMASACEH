import { TestBed } from '@angular/core/testing';

import { PartografService } from './partograf.service';

describe('PartografService', () => {
  let service: PartografService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartografService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
