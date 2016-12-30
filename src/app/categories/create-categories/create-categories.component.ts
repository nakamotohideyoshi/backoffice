import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';

@Component({
  selector: 'create-categories',
  styleUrls: [ './create-categories.style.scss' ],
  templateUrl: './create-categories.template.html'
})
export class CreateCategories implements OnInit {
  public pageInfoForm: FormGroup;
  public slugForm: FormGroup;
  public parentsArray;
  public stepForm = 1;
  public editData;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private catService: CategoriesService) {}
  ngOnInit(): void {
    this.parentsArray = this.route.snapshot.data['parents'].categories.map(item => {
      return item.id;
    });
    if (this.route.snapshot.data['categories']) {
      this.editData = this.route.snapshot.data['categories'];
      console.log(this.editData);
    }
    if (this.editData) {
      this.pageInfoForm = this.formBuilder.group({
        name: [this.editData.name, Validators.required],
        description: [this.editData.description, Validators.required],
        title: [this.editData.title, Validators.required],
        meta_description: [this.editData.meta_description, Validators.required],
        meta_keywords: [this.editData.meta_keywords, Validators.required],
        parents: [this.editData.parents, Validators.minLength(1)],
        heading: [this.editData.heading, Validators.required]
      });
      this.slugForm = this.formBuilder.group({
        slug: [this.editData.slug, Validators.required]
      });
    } else {
      this.pageInfoForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        title: ['', Validators.required],
        meta_description: ['', Validators.required],
        meta_keywords: ['', Validators.required],
        parents: [[], Validators.minLength(1)],
        heading: ['', Validators.required]
      });
      this.slugForm = this.formBuilder.group({
        slug: ['', Validators.required]
      });
    }
  }

  public previous() {
    if (this.stepForm === 1) return; else this.stepForm -= 1;
  }
  public next() {
    if (!this.checkStep()) return; else this.stepForm += 1;
    if (this.stepForm === 3) {
      let body = this.pageInfoForm.value;
      body['slug'] = this.slugForm.value['slug'];
      if (!this.editData) {
        this.catService.createCategories(body)
          .subscribe(res => {
            this.pageInfoForm.reset();
            this.slugForm.reset();
          });
      } else {
        this.catService.editCategories(body, this.editData.id)
          .subscribe();
      }
    }
  }
  public getProgress() {
    switch (this.stepForm) {
      case 1: return `33%`;
      case 2: return `66%`;
      case 3: return `100%`;
      default: return `0`;
    }
  }
  private checkStep() {
    switch (this.stepForm) {
      case 1: return this.pageInfoForm.valid;
      case 2: return this.slugForm.valid;
      default: return false;
    }
  }
}


