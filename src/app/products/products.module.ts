import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { SharedModule }  from '../shared/shared.module';

import { ProductsRoutingModule, productsComponents } from './products.routes.module';


@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [productsComponents],
  providers: []
})
export default class ProductsModule {

}
