import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';

describe('FeedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedService = TestBed.get(FeedService);
    expect(service).toBeTruthy();
  });
});
