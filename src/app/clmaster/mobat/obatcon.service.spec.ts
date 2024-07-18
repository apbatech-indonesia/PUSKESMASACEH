import { TestBed } from '@angular/core/testing';

import { ObatconService } from './obatcon.service';

describe('ObatconService', () => {
  let service: ObatconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObatconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
