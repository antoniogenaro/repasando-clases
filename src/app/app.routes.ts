import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
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
