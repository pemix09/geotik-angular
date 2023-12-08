import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [MatTooltipModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css'
})
export class ResetPasswordFormComponent {
  public resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public resetSuccess: boolean = false;
  public resetMessage: string = '';

  constructor(private authService: AuthService) {
  }
  get emailInput() { return this.resetPasswordForm.get('email'); }

  getEmailValidationMessage(): string {
    if (this.emailInput?.hasError('required')) {
      return 'Musisz podać adres email';
    }
    if (this.emailInput?.hasError('email')) {
      return 'Niepoprawny adres email';
    }
    return '';
  }

  async onSubmit() {
    console.debug('Reset password form submitted');

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const res = await this.authService.resetPassword(this.emailInput!.value!);

    res.subscribe((value: any) => {
      console.log(value);
      if ("status" in value && value["status"] === 200) {
        console.debug("Reset password success");
        this.resetSuccess = true;
      } else if ("status" in value) {
        console.error("Reset password status: " + value["status"]);
        this.resetMessage = "Reset password status: " + value["status"];
      } else {
        console.error("Register status: unknown");
        this.resetMessage = "Reset password status: unknown";
      }
    });
  }
}
