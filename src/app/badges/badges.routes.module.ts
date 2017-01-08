import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { BadgesComponent } from './badges.component';
import { BadgesListComponent } from './badges-list/badges-list.component';
import { CreateBadge } from './create-badge/create-badge.component';
import { GetBadgeResolve } from './create-badge/get-badge.resolve';

const routes: Routes = [
  {
    path: '', component: BadgesComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: BadgesListComponent },
    {
      path: 'edit/:id',
      component: CreateBadge,
      resolve: { badge: GetBadgeResolve }
    },
    { path: 'new', component: CreateBadge }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BadgesRoutingModule {

}
export const badgesComponents = [
  BadgesComponent,
  BadgesListComponent,
  CreateBadge
];
