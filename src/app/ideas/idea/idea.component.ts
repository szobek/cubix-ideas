import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Idea } from '../models/idea.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IdeasService } from '../ideas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  protected idea?: Idea;

  @Output() listIdeas: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeLoader: EventEmitter<void> = new EventEmitter<void>();
  @Input() set Idea(idea: Idea) {
    this.idea=idea;
  }

  private readonly ideasService: IdeasService=inject(IdeasService);
  private readonly destroyRef: DestroyRef=inject(DestroyRef);

  upvoteIdea(idea: Idea) {
    this.changeLoader.emit();
    this.ideasService
      .upvoteIdea(idea)
      .pipe(
        tap(() => this.listIdeas.emit()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  downvoteIdea(idea: Idea) {
    this.changeLoader.emit();
    this.ideasService
      .downvoteIdea(idea)
      .pipe(
        tap(() => this.listIdeas.emit()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  deleteIdea(idea: Idea) {
    this.changeLoader.emit();
    this.ideasService
      .deleteIdea(idea)
      .pipe(
        tap(() => this.listIdeas.emit()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  
}
