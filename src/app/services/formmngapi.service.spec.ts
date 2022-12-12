import { TestBed } from '@angular/core/testing';

import { FormmngapiService } from './formmngapi.service';

describe('FormmngapiService', () => {
  let service: FormmngapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormmngapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
