import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { ProductsRoutesComponent } from './products-routes/products-routes.component';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsPricesListComponent } from './products-prices-list/products-prices-list.component';
import { ProductsPricesListResolve }  from './products-prices-list/products-prices-list.resolve';
import { ProductCreateComponent } from './product-create/product-create.component';
import { GetProductResolve } from './product-create/get-product.resolve';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'routes/:id', component: ProductsRoutesComponent },
    { path: 'prices/:id',
      component: ProductsPricesListComponent,
      resolve: {attributes: ProductsPricesListResolve}
    },
    { path: 'edit/:id',
      component: ProductCreateComponent,
      resolve: { product: GetProductResolve}
    },
    { path: 'list', component: ProductsListComponent },
    { path: 'create', component: ProductCreateComponent }
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
  ProductsListComponent,
  ProductsPricesListComponent,
  ProductCreateComponent
];

export const productsProviders = [
  ProductsPricesListResolve
];
