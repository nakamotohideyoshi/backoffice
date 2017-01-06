import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routingOptionsComponents, OptionsRoutingModule } from './options-routes.module';
import { OptionsService } from '../shared/service/options.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OptionsRoutingModule
  ],
  declarations: [routingOptionsComponents],
  providers: [OptionsService]
})

export default class OptionsModule {
}
