import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FAQsService } from '../../shared/service/faqs.service';

@Injectable()
export class GetFAQResolve implements Resolve<any> {

  constructor (private faqsSetvice: FAQsService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.faqsSetvice.getFAQById(route.params['id']);
  }
}
