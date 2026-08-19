import { TestBed } from '@angular/core/testing';

import { CpptInputService } from './cppt-input.service';

describe('CpptInputService', () => {
  let service: CpptInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpptInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
