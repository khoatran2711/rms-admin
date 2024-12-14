import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    path: '',
    loadChildren: () =>
      import('../../pages/pages.module').then((m) => m.PagesModule),
  },


];
