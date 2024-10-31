import { TestBed } from '@angular/core/testing';

import { MtbsService } from './mtbs.service';

describe('MtbsService', () => {
  let service: MtbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
