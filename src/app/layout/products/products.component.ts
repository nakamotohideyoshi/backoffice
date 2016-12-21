import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'products',
  styleUrls: [ './products.style.scss' ],
  templateUrl: './products.template.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  public products: any;
  constructor(private productService: ProductsService) {
  }
  ngOnInit(): void {
    this.productService.getProduct()
      .subscribe(res => this.products = res.products);
  }
}
