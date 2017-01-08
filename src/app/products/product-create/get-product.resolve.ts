import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../../shared/service/products.service';

@Injectable()
export class GetProductResolve implements Resolve<any> {

  constructor (private productService: ProductsService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.getProduct(route.params['id']);
  }
}
