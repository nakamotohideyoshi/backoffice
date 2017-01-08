import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { SharedModule }  from '../shared/shared.module';

import { ProductsRoutingModule,
  productsComponents,
  productsProviders } from './products.routes.module';
import { SelectModule } from 'angular2-select';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SelectModule,
    CKEditorModule
  ],
  declarations: [ productsComponents ],
  providers: [ productsProviders ]
})
export default class ProductsModule {

}
