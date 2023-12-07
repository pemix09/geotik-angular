import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-from',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login-from.component.html',
  styleUrl: './login-from.component.css',
})
export class LoginFromComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  successResponse: string | undefined;
  errorResponse: string | undefined;

  constructor(private authService: AuthService) { 
    
  }

  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }

  getEmailValidationMessage(): string {
    if (this.emailInput?.hasError('required')) {
      return 'Musisz podać adres email';
    }
    if (this.emailInput?.hasError('email')) {
      return 'Niepoprawny adres email';
    }
    return '';
  }

  getPasswordValidationMessage(): string {
    if (this.passwordInput?.hasError('required')) {
      return 'Musisz podać hasło';
    }
    return '';
  }

  async onSubmit() {
    const res = from(this.authService.login(this.emailInput!.value!, this.passwordInput!.value!));

    res.subscribe({
      complete: () => {
        this.successResponse = "Zalogowano pomyślnie";
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorResponse = "Niepoprawny adres email lub hasło";
        } else {
          this.errorResponse = "Wystąpił błąd";
        }
      },
    });
  }
}
