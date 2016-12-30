import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule, routingComponents } from './categories-routes.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { CategoriesResolve } from './create-categories/categories-parents.resolve';
import { GetCategoriesResolve } from './create-categories/get-categories.resolve';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule
  ],
  declarations: [routingComponents],
  providers: [CategoriesResolve, GetCategoriesResolve]
})

export default class CategoriesModule {
}
