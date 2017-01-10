import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SharedModule }  from '../shared/shared.module';

import { ProvidersRoutingModule, providersComponents } from './providers.routes.module';
import { GetProviderResolve } from './create-provider/get-provider.resolve';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule
  ],
  declarations: [providersComponents],
  providers: [GetProviderResolve]
})
export default class ProvidersModule {

}
