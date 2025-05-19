import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ideaResolver } from './idea.resolver';
import { Observable } from 'rxjs';
import { Idea } from './models/idea.model';

describe('ideaResolver', () => {
  const executeResolver: ResolveFn<Observable<Idea>|undefined> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => ideaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
