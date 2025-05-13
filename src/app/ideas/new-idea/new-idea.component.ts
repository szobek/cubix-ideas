import { Component, inject, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IdeasService } from '../ideas.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-idea',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './new-idea.component.html',
  styleUrl: './new-idea.component.scss',
})
export class NewIdeaComponent {
  ideasService: IdeasService = inject(IdeasService);
  router: Router = inject(Router);
  loader: WritableSignal<boolean>
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
  });
  constructor() {
    this.loader = this.ideasService.loader;
  }
  onSubmit() {
    this.loader.update(() => true);
    if (this.createForm.valid) {
      this.ideasService
        .createIdea(
          this.createForm.value
        )
        .pipe(
          tap(() => {
            this.router.navigate(['/ideas']);
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
}
