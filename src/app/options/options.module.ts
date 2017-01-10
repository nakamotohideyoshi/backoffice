import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routingOptionsComponents, OptionsRoutingModule } from './options-routes.module';
import { OptionsService } from '../shared/service/options.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OptionsRoutingModule
  ],
  declarations: [routingOptionsComponents],
  providers: [OptionsService]
})

export default class OptionsModule {
}
