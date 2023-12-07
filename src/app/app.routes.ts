import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'forms' },
    { path: 'forms', component: FormsComponent },
    { path: 'resetPassword', component: ResetPasswordFormComponent }
];
