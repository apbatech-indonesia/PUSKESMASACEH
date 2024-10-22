import { TestBed } from '@angular/core/testing';

import { AncService } from './anc.service';

describe('AncService', () => {
  let service: AncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
