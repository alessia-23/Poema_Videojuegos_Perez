import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabs/poemas',
    pathMatch: 'full'
  },

  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [

      {
        path: 'poemas',
        loadComponent: () =>
          import('./poemas/poemas.page').then(m => m.PoemasPage)
      },

      {
        path: 'multimedia',
        loadComponent: () =>
          import('./multimedia/multimedia.page').then(m => m.MultimediaPage)
      },

      {
        path: '',
        redirectTo: 'poemas',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'poema-form',
    loadComponent: () =>
      import('./pages/poema-form/poema-form.page')
        .then(m => m.PoemaFormPage)
  },

  {
    path: 'poema-form/:id',
    loadComponent: () =>
      import('./pages/poema-form/poema-form.page')
        .then(m => m.PoemaFormPage)
  }

];