import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  private addAttributeForm: FormGroup;

  constructor(private attributesService: AttributesService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .switchMap( ({ type }) => {
        this.addAttributeFormInit(type);
        this.attributeType = type;
        return this.attributesService.getAttribute(type);
      })
      .subscribe(res => this.attributes = res);
  }

  private getAttributes() {
    this.attributesService.getAttribute(this.attributeType)
      .subscribe(res => this.attributes = res);
  }

  private addAttributeFormInit(type) {
    if (type === 'color') {
      this.addAttributeForm = this.fb.group({
        name: ['', Validators.required],
        color: ['#000000', Validators.required]
      });
    } else {
      this.addAttributeForm = this.fb.group({
        name: ['', Validators.required],
      });
    }
  }

  private addAttribute() {
    this.attributesService.createAttribute(this.attributeType, this.addAttributeForm.value)
      .subscribe(() => this.getAttributes());

    this.addAttributeForm.reset();
  }
}
