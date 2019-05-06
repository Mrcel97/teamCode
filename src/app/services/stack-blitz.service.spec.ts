import { TestBed } from '@angular/core/testing';

import { StackBlitzService } from './stack-blitz.service';

describe('StackBlitzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StackBlitzService = TestBed.get(StackBlitzService);
    expect(service).toBeTruthy();
  });
});
