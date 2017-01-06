import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PagesService } from '../../shared/service/pages.service';

@Injectable()
export class GetPageResolve implements Resolve<any> {

  constructor (private pagesSetvice: PagesService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.pagesSetvice.getPageById(route.params['id']);
  }
}
