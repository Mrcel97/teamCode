import { TestBed } from '@angular/core/testing';

import { AuthModalService } from './modal-service.service';

describe('ModalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthModalService = TestBed.get(AuthModalService);
    expect(service).toBeTruthy();
  });
});
