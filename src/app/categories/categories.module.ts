import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule, routingComponents } from './categories-routes.module';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    CategoriesRoutingModule,
    SharedModule
  ],
  declarations: [ routingComponents ],
  providers: []
})

export default class CategoriesModule {
}
