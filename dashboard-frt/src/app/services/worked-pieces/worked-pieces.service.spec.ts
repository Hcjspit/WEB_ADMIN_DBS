import { TestBed } from '@angular/core/testing';

import { WorkedPiecesService } from './worked-pieces.service';

describe('WorkedPiecesService', () => {
  let service: WorkedPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkedPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
