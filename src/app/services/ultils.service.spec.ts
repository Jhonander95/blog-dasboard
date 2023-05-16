import { TestBed } from '@angular/core/testing';

import { UltilsService } from './ultils.service';

describe('UltilsService', () => {
  let service: UltilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
