import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resta',
    pathMatch: 'full',
  },
  {
    path: 'resta',
    loadComponent: () => import('./pages/subtraction/subtraction').then((m) => m.SubtractionPage),
  },
  {
    path: 'suma',
    loadComponent: () => import('./pages/addition/addition').then((m) => m.AdditionPage),
  },
];
