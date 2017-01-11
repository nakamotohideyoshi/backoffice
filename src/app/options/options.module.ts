import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routingOptionsComponents, OptionsRoutingModule } from './options-routes.module';
import { OptionsService } from '../shared/service/options.service';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-ng2';
import { OptionRenderPrices } from './option-render-prices/option-render-prices.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OptionsRoutingModule,
    AgGridModule.withComponents([OptionRenderPrices])
  ],
  declarations: [routingOptionsComponents],
  providers: [OptionsService]
})

export default class OptionsModule {
}
