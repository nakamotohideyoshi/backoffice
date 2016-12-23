import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'products',
  styleUrls: [ './products.style.scss' ],
  templateUrl: './products.template.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  public products: any;
  constructor(private productService: ProductsService, private translate: TranslateService) {
  }
  ngOnInit(): void {
    this.productService.getProduct()
      .subscribe(res => this.products = res.products);
  }
}
