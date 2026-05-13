import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePageComponent),
    title: 'Julia Duarte Beauty Studio | Maquiagem, Penteado e Unhas em São Paulo',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
