import { TestBed } from '@angular/core/testing';

import { DatamngapiService } from './datamngapi.service';

describe('DatamngapiService', () => {
  let service: DatamngapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamngapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
