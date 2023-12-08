import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-login-from',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login-from.component.html',
  styleUrl: './login-from.component.css',
})
export class LoginFromComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  formError: string | undefined;
  successResponse: string | undefined;
  errorResponse: string | undefined;
  formFieldsValidationMessagesHidden: boolean = true;
  formResponseHidden: boolean = true;

  constructor(private authService: AuthService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('deleteIcon', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/delete.svg'));
    this.loginForm.valueChanges.subscribe(() => {
      this.clearErrors();
    })
    this.loginForm.statusChanges.subscribe((status: string) => {
      if (status === 'INVALID') {
        this.formFieldsValidationMessagesHidden = false;
      } else {
        this.formFieldsValidationMessagesHidden = true;
      }
    });
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

  clearErrors(): void {
    this.formError = undefined;
    this.successResponse = undefined;
    this.errorResponse = undefined;
    this.formResponseHidden = true;
  }

  public clearPasswordInput(): void {
    console.debug("clearingPasswordInput");
    this.passwordInput?.setValue(null);
  }
  public clearEmailInput(): void {
    console.debug("clearingEmailInput");
    this.emailInput?.setValue(null);
  }

  public async onSubmit() {
    const res = from(this.authService.login(this.emailInput!.value!, this.passwordInput!.value!));

    res.subscribe({
      complete: () => {
        this.formResponseHidden = false;
        this.successResponse = "Zalogowano pomyślnie";
      },
      error: (error: HttpErrorResponse) => {
        this.formResponseHidden = false;
        if (error.status === 401) {
          this.errorResponse = "Niepoprawny adres email lub hasło";
        } else {
          this.errorResponse = "Wystąpił błąd";
        }
      },
    });
  }
}
