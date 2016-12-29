import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { ProductsRoutesComponent } from './products-routes/products-routes.component';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'routes/:id', component: ProductsRoutesComponent },
    { path: 'list', component: ProductsListComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {

}
export const productsComponents = [
  ProductsRoutesComponent,
  ProductsComponent,
  ProductsListComponent
];
