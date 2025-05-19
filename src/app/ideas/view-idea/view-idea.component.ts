import { Component, inject, Input,  OnInit,  WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { VoteComponent } from '../vote/vote.component';

@Component({
  selector: 'app-view-idea',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule,
    LoaderComponent,
    VoteComponent
  ],
  templateUrl: './view-idea.component.html',
  styleUrl: './view-idea.component.scss',
})
export class ViewIdeaComponent implements OnInit {
  @Input() idea?: Idea;
  ideaFromService: WritableSignal<Idea>=this.ideasService.idea; 
  router: Router = inject(Router);
  loader: WritableSignal<boolean>

  constructor(
      private readonly ideasService: IdeasService,
    ) {
      this.loader=ideasService.loader
    }
  ngOnInit(): void {
    this.ideasService.idea.update(() => (this.idea as Idea));
    console.log(this.ideasService.idea());
    
     
  }


 
}
