import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-ng2';

@Component({
  selector: 'option-render-prices',
  styleUrls: [ './option-render-prices.style.scss' ],
  templateUrl: './option-render-prices.template.html'
})
export class OptionRenderPrices implements AgRendererComponent {
  public pricesTable;
  agInit(params) {
    this.pricesTable = params.value;
  }
  public getKeyPrice(object) {
    return Object.keys(object);
  }
  public getArrayPrice(object, type) {
    let arr = [];
    Object.keys(object).forEach((item) => {
      if (type === 'price') {
        arr.push(object[item].price);
      } else {
        arr.push(object[item].campaign_price);
      }
    });
    return arr;
  }
}


