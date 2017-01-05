import { Component, OnInit } from '@angular/core';
import { FAQsService } from '../../shared/service/faqs.service';


@Component({
  selector: 'faqs-list',
  styleUrls: [ 'faqs-list.style.scss' ],
  templateUrl: 'faqs-list.template.html',
})
export class FAQsListComponent implements OnInit {
  public faqs: any;
  constructor(private faqsService: FAQsService) {
  }
  ngOnInit(): void {
    this.faqsService.getFAQs()
      .subscribe(res => this.faqs = res);
  }
}
