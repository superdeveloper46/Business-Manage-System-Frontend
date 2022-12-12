import { TestBed } from '@angular/core/testing';

import { FormTaskProcessApiService } from './form-task-process-api.service';

describe('FormTaskProcessApiService', () => {
  let service: FormTaskProcessApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTaskProcessApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
