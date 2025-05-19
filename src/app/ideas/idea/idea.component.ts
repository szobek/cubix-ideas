import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Idea } from '../models/idea.model';
import { RouterModule } from '@angular/router';
import { VoteComponent } from "../vote/vote.component";
import { IdeasService } from '../ideas.service';
import { IdeaNamePipe } from '../idea-name.pipe';
import { IdeaDescriptionPipe } from '../idea-description.pipe';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule,
    VoteComponent,
    IdeaNamePipe,
    IdeaDescriptionPipe
],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  protected idea?: Idea;
loader:WritableSignal<boolean>;
@Output() setIdea: EventEmitter<Idea[]> = new EventEmitter<Idea[]>();
constructor(private readonly ideasService: IdeasService) {
  this.loader=ideasService.loader;
}
  @Input() set Idea(idea: Idea) {
    this.idea=idea;
  }

}
