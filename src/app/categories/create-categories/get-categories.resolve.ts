import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';

@Injectable()
export class GetCategoriesResolve implements Resolve<any> {

  constructor (private catSetvice: CategoriesService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.catSetvice.getCategoryById(route.params['id']);
  }
}
