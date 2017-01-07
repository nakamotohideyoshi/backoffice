import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';


import { ProductsRoutesComponent } from './products-routes/products-routes.component';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsPricesListComponent } from './products-prices-list/products-prices-list.component';
import {
  ProductsPricesCreateComponent
} from './products-prices-create/products-prices-create.component';

import { GetAttributeResolve }  from './get-attribute';
import { ProductCreateComponent } from './product-create/product-create.component';
import { GetProductResolve } from './product-create/get-product.resolve';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'routes/:id', component: ProductsRoutesComponent },
    { path: 'prices/:id',
      component: ProductsPricesListComponent,
      resolve: {attributes: GetAttributeResolve}
    },
    { path: 'prices/:id/create',
      component: ProductsPricesCreateComponent,
      resolve: {attributes: GetAttributeResolve}
    },
    { path: 'prices/:id/edit/:scope',
      component: ProductsPricesCreateComponent,
      resolve: {attributes: GetAttributeResolve}
    },
    { path: 'edit/:id',
      component: ProductCreateComponent,
      resolve: { product: GetProductResolve, attributes: GetAttributeResolve}
    },
    { path: 'list', component: ProductsListComponent },
    { path: 'create',
      component: ProductCreateComponent,
      resolve: {attributes: GetAttributeResolve}
    }
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
  ProductsPricesCreateComponent,
  ProductCreateComponent
];

export const productsProviders = [
  GetAttributeResolve,
  GetProductResolve
];
