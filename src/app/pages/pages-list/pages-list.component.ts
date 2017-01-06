import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../shared/service/pages.service';


@Component({
  selector: 'pages-list',
  styleUrls: [ 'pages-list.style.scss' ],
  templateUrl: 'pages-list.template.html',
})
export class PagesListComponent implements OnInit {
  public pages: any;
  constructor(private pageService: PagesService) {
  }
  ngOnInit(): void {
    this.pageService.getPages()
      .subscribe(res => this.pages = res);
  }
}
