import { RouterModule, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/landing/landing.module').then((m) => m.LandingModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./feature/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
