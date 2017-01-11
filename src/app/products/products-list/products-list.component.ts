import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/service/products.service';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/operator/switchMap';

@Component({
  selector: 'products-list',
  styleUrls: [ 'products-list.style.scss' ],
  templateUrl: 'products-list.template.html',
})
export class ProductsListComponent implements OnInit {
  public products: any;
  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .switchMap( ({ q }) => {
        if (q) {
          return this.productService.searchProducts(q);
        } else return this.productService.getProducts();
      })
      .subscribe(res => this.products = res.products);
  }
}
