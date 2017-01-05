import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../shared/service/options.service';

@Component({
  selector: 'options-list',
  styleUrls: [ './options-list.style.scss' ],
  templateUrl: './options-list.template.html'
})
export class OptionsListComponent implements OnInit {
  public options: any;
  constructor (private optService: OptionsService) {}
  ngOnInit(): void {
    this.optService.getListOptions()
      .subscribe( res => this.options = res);
  }
  public getKeyPrice(object) {
    return Object.keys(object);
  }
  public getArrayPrice(object) {
    let arr = [];
    Object.keys(object).forEach((item) => arr.push(object[item].price));
    return arr;
  }
}


