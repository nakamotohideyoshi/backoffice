import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { ProvidersComponent } from './providers.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { CreateProvider } from './create-provider/create-provider.component';
import { GetProviderResolve } from './create-provider/get-provider.resolve';

const routes: Routes = [
  {
    path: '', component: ProvidersComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ProvidersListComponent },
    {
      path: 'edit/:id',
      component: CreateProvider,
      resolve: { provider: GetProviderResolve }
    },
    { path: 'new', component: CreateProvider }
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
  ProvidersListComponent,
  CreateProvider
];
