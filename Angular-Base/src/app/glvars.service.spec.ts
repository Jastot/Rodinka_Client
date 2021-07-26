import { TestBed } from '@angular/core/testing';

import { GlvarsService } from './glvars.service';

describe('GlvarsService', () => {
  let service: GlvarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlvarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
