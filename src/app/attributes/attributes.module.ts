import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule }  from '../shared/shared.module';

import { AttributesRoutingModule, attributesComponents } from './attributes.routes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttributesRoutingModule,
    SharedModule
  ],
  declarations: [attributesComponents],
  providers: []
})
export default class AttributesModule {

}
