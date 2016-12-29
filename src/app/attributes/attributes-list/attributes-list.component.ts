import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AttributesService } from '../../shared/service/attributes.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'attributes-list',
  styleUrls: [ './attributes-list.style.scss' ],
  templateUrl: './attributes-list.template.html',
})
export class AttributesListComponent implements OnInit {

  private attributes;
  private attributeType;

  constructor(private attributesService: AttributesService,
              private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.activatedRoute.params
      .switchMap( ({ type }) => {
        this.attributeType = type;
        return this.attributesService.getAttribute(type);
      })
      .subscribe(res => this.attributes = res);
  }
}
