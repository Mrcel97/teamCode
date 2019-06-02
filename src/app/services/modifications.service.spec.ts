import { TestBed } from '@angular/core/testing';

import { ModificationsService } from './modifications.service';

describe('ModificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModificationsService = TestBed.get(ModificationsService);
    expect(service).toBeTruthy();
  });
});
