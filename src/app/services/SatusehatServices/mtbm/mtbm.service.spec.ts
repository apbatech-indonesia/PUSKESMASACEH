import { TestBed } from '@angular/core/testing';

import { MtbmService } from './mtbm.service';

describe('MtbmService', () => {
  let service: MtbmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtbmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
