import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../shared/service';
import { FormBuilder , FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'products-prices-create',
  styleUrls: [ 'products-prices-create.style.scss' ],
  templateUrl: 'products-prices-create.template.html',
})
export class ProductsPricesCreateComponent implements OnInit {
  private prices;

  private colorArray = [];
  private sizeArray = [];
  private clothingSizeArray = [];
  private modelArray = [];
  private flavourArray = [];
  private pricesForm: FormGroup;

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.pricesForm = this.fb.group({
      color: [0],
      size: [0],
      clothing_size: [0],
      model: [0],
      flavour: [0],
      prices: this.fb.array([
        this.initPrice()
      ])
    });
  }

  ngOnInit() {

    this.colorArray = this.activatedRoute.snapshot.data['attributes'][0].map(
      item => ({value: item.id, label: item.name})
    );
    this.sizeArray = this.activatedRoute.snapshot.data['attributes'][1].map(
      item => ({value: item.id, label: item.name})
    );
    this.clothingSizeArray = this.activatedRoute.snapshot.data['attributes'][2].map(
      item => ({value: item.id, label: item.name})
    );
    this.modelArray = this.activatedRoute.snapshot.data['attributes'][3].map(
      item => ({value: item.id, label: item.name})
    );
    this.flavourArray = this.activatedRoute.snapshot.data['attributes'][4].map(
      item => ({value: item.id, label: item.name})
    );

    this.colorArray.push({value: 0, label: 'any'});
    this.sizeArray.push({value: 0, label: 'any'});
    this.clothingSizeArray.push({value: 0, label: 'any'});
    this.modelArray.push({value: 0, label: 'any'});
    this.flavourArray.push({value: 0, label: 'any'});
  }

  private initPrice () {
    return this.fb.group({
      quantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      campaign_price: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  private addPrice() {
    const control = <FormArray>this.pricesForm.controls['prices'];
    control.push(this.initPrice());
  }

  private removePrice(i: number) {
    const control = <FormArray>this.pricesForm.controls['prices'];
    control.removeAt(i);
  }

  private createPricesObject() {

    let prices = this.pricesForm.value.prices;
    let pricesObject = {};

    for (let i = 0; i < prices.length; i++) {
      pricesObject[prices[i].quantity] = {
        price: prices[i].price,
        campaign_price: prices[i].campaign_price
      };
    }

    return pricesObject;
  }

  private createPrice() {

    let form = this.pricesForm.value;
    let id = this.activatedRoute.snapshot.params['id'];
    let scope = [form.color, form.size, form.clothing_size, form.model, form.flavour].join('-');

    let body = {
      name: 'Pris/st',
      prices: this.createPricesObject()
    };

    this.productsService.addProductPrice(id, body, scope)
      .subscribe(() => {
        this.pricesForm.reset({
          color: 0,
          size: 0,
          clothing_size: 0,
          model: 0,
          flavour: 0,
        });
        this.pricesForm.controls['prices'] = this.fb.array([this.initPrice()]);
      });
  }
}
