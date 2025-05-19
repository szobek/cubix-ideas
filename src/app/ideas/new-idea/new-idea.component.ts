import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IdeasService } from '../ideas.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Idea } from '../models/idea.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-idea',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule,MatProgressSpinnerModule],
  templateUrl: './new-idea.component.html',
  styleUrl: './new-idea.component.scss',
})
export class NewIdeaComponent implements OnInit {
  @Input() idea?: Idea;
  
  isCall:WritableSignal<boolean>=signal(false);
  loader: WritableSignal<boolean>;

  ideasService: IdeasService=inject(IdeasService);
  router: Router=inject(Router);
  
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.loader = this.ideasService.loader;
  }

  onSubmit() {
    this.loader.set(true);
    this.isCall.set(true);
    if (this.createForm.valid) {
      const mode= this.idea ? this.ideasService.editIdea(this.idea.id, this.createForm.value) : this.ideasService
        .createIdea(this.createForm.value)
      mode.pipe(
          tap(() => {
            this.router.navigate(['/ideas']);
          }),
          finalize(() => {
            this.isCall.set(false);
          }),
          catchError((error) => {
            alert('Something went wrong');
            console.log(error);
            return error;
          })
        )
        .subscribe();
    }
  }

  ngOnInit() {
    if(this.idea) {
      this.createForm.setValue({
        name: this.idea.name,
        description: this.idea.description,
      });
    }
  }
}
