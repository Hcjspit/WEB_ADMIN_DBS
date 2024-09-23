import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { lineDataResolver } from './line-data.resolver';

describe('lineDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => lineDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
