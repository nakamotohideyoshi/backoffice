import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/service/products.service';


@Component({
  selector: 'products',
  styleUrls: [ 'products-list.style.scss' ],
  templateUrl: 'products-list.template.html',
})
export class ProductsListComponent implements OnInit {
  public products: any;
  constructor(private productService: ProductsService) {
  }
  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(res => this.products = res.products);
  }
}
