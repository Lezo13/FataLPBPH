import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_shared/guards';
import { NotFoundComponent, ServerErrorComponent } from './_shared/components';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './handlers/confirm-email/confirm-email.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: 'not-found' }
];
