import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { SharedModule }  from '../shared/shared.module';

import { ProvidersRoutingModule, providersComponents } from './providers.routes.module';


@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [providersComponents],
  providers: []
})
export default class ProvidersModule {

}
