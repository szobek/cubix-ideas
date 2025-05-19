import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { IdeasService } from './ideas.service';
import { Observable } from 'rxjs';
import { Idea } from './models/idea.model';

export const ideaResolver: ResolveFn<Observable<Idea>|undefined> = (route) => {
  const ideasService = inject(IdeasService);
  const ideaId = route.queryParamMap.get('id');

  if(ideaId) {
    return ideasService.getIdeaById(ideaId);
  } else {
    return undefined;
  }
};
