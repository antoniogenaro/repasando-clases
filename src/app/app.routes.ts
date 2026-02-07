import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resta-dos-cifras',
    pathMatch: 'full',
  },
  {
    path: 'resta-dos-cifras',
    loadComponent: () =>
      import('./pages/subtraction-two-digits/subtraction-page').then((m) => m.SubtractionPage),
  },
];
