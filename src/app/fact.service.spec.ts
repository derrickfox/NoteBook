import { TestBed, inject } from '@angular/core/testing';

import { FactService } from './fact.service';

describe('FactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactService]
    });
  });

  it('should be created', inject([FactService], (service: FactService) => {
    expect(service).toBeTruthy();
  }));
});
