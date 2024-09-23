import { TestBed } from '@angular/core/testing';

import { ProdLineService } from './prod-line.service';

describe('ProdLineService', () => {
  let service: ProdLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
