import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Idea } from '../models/idea.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
})
export class VoteComponent {
  @Input() idea?: Idea;
  @Output() setIdea: EventEmitter<Idea|Idea[]>=new EventEmitter<Idea|Idea[]>();

  private readonly destroyRef: DestroyRef=inject(DestroyRef);
  loader: WritableSignal<boolean>=this.ideasService.loader;
  private readonly ideaId: string = this.activatedRoute.snapshot.params['id'];

  constructor(
    private readonly ideasService: IdeasService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.loader.set(false);
  }

  upvoteIdea(idea: Idea) {
    this.loader.set(true);
    this.ideasService
    .upvoteIdea(idea)
    .pipe(
      switchMap(() => {
        if (this.ideaId) {
          return this.ideasService.getIdeaById(idea.id+"")
        } else{
          return this.ideasService.listIdeas();
        }
      }),
      tap((idea:Idea|Idea[]) => {
        if (idea instanceof Array) {
          this.ideasService.ideaList.update(() => idea);
        } else{
          this.ideasService.idea.set(idea);
        }
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
          this.loader.set(false);
        })
    )
    .subscribe();
  }
  
  downvoteIdea(idea: Idea) {
    this.loader.set(true);
    this.ideasService
    .downvoteIdea(idea)
    .pipe(
      switchMap(() => {
        if (this.ideaId) {
          return this.ideasService.getIdeaById(idea.id+"")
        } else{
          return this.ideasService.listIdeas();
        }
      }),
      tap((idea:Idea|Idea[]) => {
        console.log(idea instanceof Array);
        
        if (idea instanceof Array) {
          this.ideasService.ideaList.update(() => idea);
        } else{
          this.ideasService.idea.update(() =>(idea));
        }
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
          this.loader.set(false);
        })
    )
    .subscribe();
  }
  
  deleteIdea(idea: Idea) {
    this.loader.set(true);
    this.ideasService
    .deleteIdea(idea)
    .pipe(
      tap(() => {
        this.router.navigate(['/ideas']);
      }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loader.set(false);
        })
      )
      .subscribe();
  }
}
