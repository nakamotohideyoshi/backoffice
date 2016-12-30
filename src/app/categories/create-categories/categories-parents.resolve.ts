import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';

@Injectable()
export class CategoriesResolve implements Resolve<any> {

  constructor (private catSetvice: CategoriesService) {}
  resolve() {
    return this.catSetvice.getCategories();
  }
}
