import { Component, DestroyRef, WritableSignal } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IdeaComponent } from '../idea/idea.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-idea',
  standalone: true,
  imports: [IdeaComponent, LoaderComponent,MatButtonModule,RouterModule],
  templateUrl: './list-idea.component.html',
  styleUrl: './list-idea.component.scss',
})
export class ListIdeaComponent {
  ideas: WritableSignal<Idea[]> = this.ideasService.ideaList;
  loader: WritableSignal<boolean>
  constructor(
    private readonly ideasService: IdeasService,
    private readonly destroyRef: DestroyRef
  ) {
    this.loader=ideasService.loader
    this.listIdeas().subscribe();
  }

  setLoader() {
    this.loader.update(() => true);
  }

  listIdeas() {
    return this.ideasService.listIdeas().pipe(
      tap((ideas) => (this.ideas.set(ideas))),
      tap(() => (this.loader.update(() => false))),
      takeUntilDestroyed(this.destroyRef)
    );
  }
  listAfterEmit() {
    this.loader.update(() => true);
    this.listIdeas()
    .pipe(
      tap(() => (this.loader.update(() => false))),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
  }
  
 
}
