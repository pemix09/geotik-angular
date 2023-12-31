import { Component, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTooltipModule} from '@angular/material/tooltip';
import { IconService } from '../services/icon.service';
import { MatIconModule } from '@angular/material/icon';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatTooltipModule, MatIconModule, PasswordStrengthComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/\d/), 
    Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/), Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, this.validateRepeatedPasword()])
  })
  strongPassword = false;

  @Input()
  onSubmitSuccess!: () => void;

  constructor(private authService: AuthService, private iconService: IconService) {
    this.iconService.registerIcons();
  }

  get emailInput() { return this.registerForm.get('email'); }
  get passwordInput() { return this.registerForm.get('password'); }
  get repeatPasswordInput() { return this.registerForm.get('repeatPassword'); }

  private validateRepeatedPasword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      if (value !== this.passwordInput?.value) {
        return { repeatPasswordValid: false }
      }

      return null;
    }
  }

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
    if (this.passwordInput?.value?.search(/\d/) === -1) {
      return 'Hasło musi zawierać cyfrę';
    }
    if (this.passwordInput?.value?.search(/[A-Z]/) === -1) {
      return 'Hasło musi zawierać wielką literę';
    }
    if (this.passwordInput?.value?.search(/[a-z]/) === -1) {
      return 'Hasło musi zawierać małą literę';
    }
    if (this.passwordInput!.value!.length < 8) {
      return 'Hasło musi mieć co najmniej 8 znaków';
    }

    return '';
  }

  getRepeatedPasswordValidationMessage(): string {

    if (this.passwordInput?.hasError('required')) {
      return 'Musisz powtórzyć hasło';
    }

    if (this.repeatPasswordInput?.value !== this.passwordInput?.value) {
      return 'Hasła muszą być takie same';
    }

    return '';
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    
    const res = await this.authService.register(this.emailInput!.value!, this.passwordInput!.value!)

    res.subscribe((value: any) => {
      console.log(value);
      if ("status" in value && value["status"] === 200) {
        console.log("Register status: " + value["status"]);
        this.onSubmitSuccess();
      } else if ("status" in value) {
        console.error("Register status: " + value["status"]);
      } else {
        console.error("Register status: unknown");
      }
    });
  }
}
