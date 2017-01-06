import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OptionsService } from '../../shared/service/options.service';

@Component({
  selector: 'option-create',
  styleUrls: [ './option-create.style.scss' ],
  templateUrl: './option-create.template.html'
})
export class OptionCreateComponent {
  public optionForm: FormGroup;
  public prices = [];
  public error = '';
  constructor (private formBuilder: FormBuilder, private optService: OptionsService) {}
  ngOnInit(): void {
    this.optionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      internal_name: ['', [Validators.required, Validators.maxLength(60)]],
      start_cost_name: ['', [Validators.required, Validators.maxLength(20)]],
      start_cost: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      start_cost_mode: ['', Validators.required],
      prices: this.formBuilder.array([])
    });
  }
  public addPrice() {
    this.optionForm.value.prices.push(this.formBuilder.group({
      count: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      campaign_price: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    }));
  }
  public deletePrice(event, key) {
    event.preventDefault();
    this.optionForm.value.prices.splice(key, 1);
  }
  public checkForm() {
    if (!this.optionForm.valid || !this.optionForm.value.prices.length) {
      Object.keys(this.optionForm.value).forEach((nameField) => {
        if (this.optionForm.value[nameField].length === 0 && nameField !== 'prices') {
          this.optionForm.controls[nameField].markAsDirty(true);
        } else {
          this.optionForm.value['prices'].forEach((item) => {
            item.controls['count'].markAsDirty(true);
            item.controls['price'].markAsDirty(true);
            item.controls['campaign_price'].markAsDirty(true);
          });
        }
      });
      return false;
    }
    if (this.optionForm.value.prices.find((item) => item.valid === false)) {
      this.optionForm.value['prices'].forEach((item) => {
        item.controls['count'].markAsDirty(true);
        item.controls['price'].markAsDirty(true);
        item.controls['campaign_price'].markAsDirty(true);
      });
      return false;
    }
    return true;
  }
  public create() {
    if (!this.checkForm()) return;
    this.error = '';
    let body = {
      'price_mode': this.optionForm.value.start_cost_mode
    };
    Object.keys(this.optionForm.value).forEach((param) => {
      if (param !== 'prices') {
        body[param] = this.optionForm.value[param];
      } else {
        body[param] = {};
        this.optionForm.value.prices.forEach((item) => {
          body[param][item.value.count] = {
            'price': item.value.price,
            'campaign_price': item.value.campaign_price
          };
        });
      }
    });
    this.optService.createOption(body).subscribe(
      () =>  {
        this.optionForm = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(60)]],
          internal_name: ['', [Validators.required, Validators.maxLength(60)]],
          start_cost_name: ['', [Validators.required, Validators.maxLength(20)]],
          start_cost: ['', [Validators.required, Validators.pattern('[0-9]+')]],
          start_cost_mode: ['', Validators.required],
          prices: this.formBuilder.array([])
        });
      },
      error => {
        this.error = error.json().message;
        if (!!error) return;
      });
  }
  public getError(form, nameField) {
    return form.controls[nameField].errors && form.controls[nameField].dirty;
  }
  public getErrorTypeNumber(form, nameField) {
    return form.value[nameField].length > 0
      && form.controls[nameField].errors
      && form.controls[nameField].dirty;
  }
}


