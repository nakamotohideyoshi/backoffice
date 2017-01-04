import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { ProvidersComponent } from './providers.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

const routes: Routes = [
  {
    path: '', component: ProvidersComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ProvidersListComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProvidersRoutingModule {

}
export const providersComponents = [
  ProvidersComponent,
  ProvidersListComponent
];
