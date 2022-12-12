import { TestBed } from '@angular/core/testing';

import { FormtaskapiService } from './formtaskapi.service';

describe('FormtaskapiService', () => {
  let service: FormtaskapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormtaskapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
