import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProvidersService } from '../../shared/service/providers.service';

@Injectable()
export class GetProviderResolve implements Resolve<any> {

  constructor (private providersSetvice: ProvidersService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.providersSetvice.getProviderById(route.params['id']);
  }
}
