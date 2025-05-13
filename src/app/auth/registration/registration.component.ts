import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registrationForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('',[Validators.minLength(6),Validators.required])
  });

  register(){
    if(this.registrationForm.valid&&this.registrationForm.value.email&&this.registrationForm.value.password){
      this.authService.registerUser(this.registrationForm.value.email, this.registrationForm.value.password).subscribe()
    }
  }

}
