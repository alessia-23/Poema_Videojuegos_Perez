import { TestBed } from '@angular/core/testing';

import { Poemas } from './poemas.service';

describe('Poemas', () => {
  let service: Poemas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Poemas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
