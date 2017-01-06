import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProvidersService } from '../../shared/service/providers.service';
import { OptionsService } from '../../shared/service/options.service';
import { CategoriesService } from '../../shared/service/categories.service';
import { AttributesService } from '../../shared/service/attributes.service';
import { ProductsService } from '../../shared/service/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-create',
  styleUrls: [ 'product-create.style.scss' ],
  templateUrl: './product-create.template.html',

})

export class ProductCreateComponent implements OnInit {
  public productForm: FormGroup;
  public error;
  public success;
  public providerIdArray = [];
  public unitArray;
  public optionIdArray = [];
  public statusArray = [];
  public categoriesArray = [];
  public colorsArray = [];
  public clothingSizesArray = [];
  public sizesArray = [];
  public modelsArray = [];
  public flavoursArray = [];
  public editData = '';
  constructor (private formBuilder: FormBuilder,
               private providerService: ProvidersService,
               private optionService: OptionsService,
               private categoriesService: CategoriesService,
               private attribytesSerivce: AttributesService,
               private productService: ProductsService,
               private route: ActivatedRoute) {
    this.unitArray = [
      { value: 'st', label: 'st'},
      { value: 'kg', label: 'kg' }
    ];
    this.statusArray = [
      { value: 'active', label: 'active'},
      { value: 'hidden', label: 'hidden'},
      { value: 'sold_out', label: 'sold_out'}
    ];
  }
  ngOnInit(): void {
    if (this.route.snapshot.data['product']) {
      this.editData = this.route.snapshot.data['product'];
    }
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      sku: ['', [Validators.required, Validators.maxLength(20)]],
      provider_id: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      printing_option_id: ['', Validators.required],
      status: ['', Validators.required],
      slug: ['', Validators.required],
      imprint_included: false,
      sell_without_imprint: false,
      sort: ['0', Validators.required],
      categories: ['', Validators.required],
      colors: ['', Validators.required],
      clothing_sizes: ['', Validators.required],
      sizes: ['', Validators.required],
      models: ['', Validators.required],
      flavours: ['', Validators.required],
      highlight: false
    });
    if (this.editData) {
      Object.keys(this.productForm.value).forEach((nameField) => {
        if (!Array.isArray(this.editData[nameField])) {
          this.productForm.controls[nameField].reset(this.editData[nameField]);
        }
        /*this.productForm.controls[nameField].reset(this.editData[nameField]);*/
      });
    }
    this.providerService.getProviders().subscribe((res) => {
      res.forEach(item => this.providerIdArray.push({value: item.id, label: item.name}));
    });
    this.optionService.getListOptions().subscribe((res) => {
      this.optionIdArray.push({value: 'NULL', label: 'no printing'});
      res.forEach((item) => this.optionIdArray.push({value: item.id, label: item.internal_name}));
    });
    this.categoriesService.getCategories().subscribe((res) => {
      res.categories.forEach((item) =>
        this.categoriesArray.push({value: item.id, label: item.name}));
    });
    this.attribytesSerivce.getAttribute('colors').subscribe((res) => {
      res.forEach((item) => this.colorsArray.push({value: item.id, label: item.name}));
    });
    this.attribytesSerivce.getAttribute('clothing_size').subscribe((res) => {
      res.forEach((item) => this.clothingSizesArray.push({value: item.id, label: item.name}));
    });
    this.attribytesSerivce.getAttribute('size').subscribe((res) => {
      res.forEach((item) => this.sizesArray.push({value: item.id, label: item.name}));
    });
    this.attribytesSerivce.getAttribute('model').subscribe((res) => {
      res.forEach((item) => this.modelsArray.push({value: item.id, label: item.name}));
    });
    this.attribytesSerivce.getAttribute('flavour').subscribe((res) => {
      res.forEach((item) => this.flavoursArray.push({value: item.id, label: item.name}));
    });
  }
  public getError(form, nameField) {
    return form.controls[nameField].errors && form.controls[nameField].dirty;
  }
  public checkForm() {
    if (!this.productForm.valid) {
      Object.keys(this.productForm.value).forEach((nameField) => {
        if (this.productForm.value[nameField].length === 0 ) {
          this.productForm.controls[nameField].markAsDirty(true);
        }
      });
      return false;
    }
    return true;
  }
  public create() {
    if (!this.checkForm()) return;
    this.success = '';
    this.productService.createProduct(this.productForm.value).subscribe(
      res => {
        Object.keys(this.productForm.value).forEach((nameField) => {
          if (nameField !== 'sort') {
            this.productForm.controls[nameField].reset('', { dirty: false});
          } else {
            this.productForm.controls[nameField].reset('0');
          }
        });
        this.success = 'success product create';
      },
      error => {
        this.error = error.json().message;
        if (!!error) return;
      });
  }
  public update() {
    if (!this.checkForm()) return;
    this.success = '';
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.productService.updateProduct(id, this.productForm.value).subscribe(
      (res) => {
        this.success = 'product update success';
      },
      error => {
        this.error = error.json().message;
        if (!!error) return;
      });
  }
}
