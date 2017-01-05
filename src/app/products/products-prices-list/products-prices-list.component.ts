import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../shared/service/products.service';

@Component({
  selector: 'products-prices-list',
  styleUrls: [ 'products-prices-list.style.scss' ],
  templateUrl: 'products-prices-list.template.html',
})
export class ProductsPricesListComponent implements OnInit {
  private prices;
  private attributes;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.attributes = this.activatedRoute.snapshot.data['attributes'];
    this.activatedRoute.params
      .switchMap(({ id }) => this.productsService.getProductPrices(id))
      .subscribe(prices => {
        return this.prices = this.getPrices(prices);
      });
  }

  private getPrices (prices) {
    return prices
      .map(price => {
        let attrs = price.scope.split('-');
        return {
          color: this.getColor(attrs[0]),
          size: this.getSize(attrs[1]),
          clothing_size: this.getClothingSize(attrs[2]),
          model: this.getModel(attrs[3]),
          flavour: this.getFlavour(attrs[4]),
          titles: Object.keys(price.prices),
          values: this.getPriceValues(price.prices),
          name: price.name
        };
      });
  }

  private getColor(id) {
    let color = this.attributes[0];
    if (id === '0') return 'Any';
    for (let i = 0; i < color.length; i++) {
      if (color[i].id === id) return color[i].name;
    }
  }

  private getSize(id) {
    let size = this.attributes[1];
    if (id === '0') return 'Any';
    for (let i = 0; i < size.length; i++) {
      if (size[i].id === id) return size[i].name;
    }
  }

  private getClothingSize(id) {
    let clothingSize = this.attributes[2];
    if (id === '0') return 'Any';
    for (let i = 0; i < clothingSize.length; i++) {
      if (clothingSize[i].id === id) return clothingSize[i].name;
    }
  }

  private getModel(id) {
    let model = this.attributes[3];
    if (id === '0') return 'Any';
    for (let i = 0; i < model.length; i++) {
      if (model[i].id === id) return model[i].name;
    }
  }

  private getFlavour(id) {
    let flavour = this.attributes[4];
    if (id === '0') return 'Any';
    for (let i = 0; i < flavour.length; i++) {
      if (flavour[i].id === id) return flavour[i].name;
    }
  }

  private getPriceValues(prices) {
    let arr = [];
    Object.keys(prices).forEach((item) => arr.push(prices[item].price));
    return arr;
  }
}
