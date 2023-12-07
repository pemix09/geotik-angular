import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFromComponent } from '../login-from/login-from.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [MatTabsModule, LoginFromComponent, RegisterFormComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  readonly loginIndex = 0;
  readonly registerIndex = 1;
  selectedIndex = 0;

  onRegisterSuccess = () => {
    this.selectedIndex = this.loginIndex;
  }
}
