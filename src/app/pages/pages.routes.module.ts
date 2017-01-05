import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { PagesComponent } from './pages.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { CreatePage } from './create-page/create-page.component';
import { GetPageResolve } from './create-page/get-page.resolve';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: PagesListComponent },
    {
      path: 'edit/:id',
      component: CreatePage,
      resolve: { page: GetPageResolve }
    },
    { path: 'new', component: CreatePage }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {

}
export const pagesComponents = [
  PagesComponent,
  PagesListComponent,
  CreatePage
];
