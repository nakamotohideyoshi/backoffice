import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth/authGuard.service';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app',   loadChildren: () => System.import('./layout/layout.module'),
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => System.import('./login/login.module') },
  { path: 'error', component: ErrorComponent },
  { path: '**',    component: ErrorComponent }
];
