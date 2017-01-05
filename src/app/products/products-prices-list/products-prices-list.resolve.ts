import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AttributesService } from '../../shared/service/attributes.service';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProductsPricesListResolve implements Resolve<any> {

  constructor ( private attributesService: AttributesService) {}
  resolve() {
    return Observable.forkJoin([
      this.attributesService.getAttribute('color'),
      this.attributesService.getAttribute('size'),
      this.attributesService.getAttribute('clothing_size'),
      this.attributesService.getAttribute('model'),
      this.attributesService.getAttribute('flavour')
    ]);
  };
}
