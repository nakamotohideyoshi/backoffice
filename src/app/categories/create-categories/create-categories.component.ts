import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-categories',
  styleUrls: [ './create-categories.style.scss' ],
  templateUrl: './create-categories.template.html'
})
export class CreateCategories implements OnInit {
  public pageInfoForm: FormGroup;
  public parentsArray;
  public editData;
  public categoryRoute: any;
  public error = '';
  public errorForm = '';
  public mainSlug = '';
  public routesForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private catService: CategoriesService) {}
  ngOnInit(): void {
    this.parentsArray = this.route.snapshot.data['parents'].categories;
    if (this.route.snapshot.data['categories']) {
      this.editData = this.route.snapshot.data['categories'];
    }
    if (!this.editData) {
      this.pageInfoForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        title: ['', Validators.required],
        meta_description: ['', Validators.required],
        meta_keywords: ['', Validators.required],
        parents: [[], Validators.minLength(1)],
        heading: ['', Validators.required],
        slug: ['', Validators.required]
      });
    } else {
      this.pageInfoForm = this.formBuilder.group({
        name: [this.editData.name, Validators.required],
        description: [this.editData.description, Validators.required],
        title: [this.editData.title, Validators.required],
        meta_description: [this.editData.meta_description, Validators.required],
        meta_keywords: [this.editData.meta_keywords, Validators.required],
        parents: [this.editData.parents, Validators.minLength(1)],
        heading: [this.editData.heading, Validators.required],
        slug: [this.editData.slug, Validators.required]
      });
      this.routesForm = this.formBuilder.group({
        slug: [ '', Validators.required ],
        primary: false
      });
      this.route.params
        .switchMap(({ id }) =>
          Observable.forkJoin([
            this.catService.getCategoriesRoutes(id),
            this.catService.getCategoryById(id)
          ])
        )
        .subscribe(([routes, categories]) => {
          this.categoryRoute = routes;
          this.mainSlug = categories.slug;
        });
    }
  }
  public create() {
    if (!this.pageInfoForm.valid) return;
    this.errorForm = '';
    let obs = this.catService.addCategoriesRoutesPost(
      { slug: this.pageInfoForm.value.slug }, 0
    );
    obs = obs.flatMap(() => this.catService
      .editCategory({ slug: this.pageInfoForm.value.slug }, 0)
    );
    obs = obs.flatMap( () => this.catService.createCategory(this.pageInfoForm.value) );
    obs.subscribe(
      () => this.pageInfoForm.reset(),
      error => {
        this.errorForm = error.json().message;
        if (!!error) return;
    });
  }
  public update() {
    if (!this.pageInfoForm.valid) return;
    let newRoute = !!this.categoryRoute.find( (item) => {
      return (item.slug === this.pageInfoForm.value.slug);
    });
    if (!newRoute) {
      this.errorForm = '';
      let obs = this.catService.addCategoriesRoutesPost(
        { slug: this.pageInfoForm.value.slug }, this.editData.id
      );
      obs = obs.flatMap(() => this.catService
        .editCategory(this.pageInfoForm.value, this.editData.id)
      );
      obs.subscribe(
        () => this.getRoutes(this.editData.id),
        error => {
          this.errorForm = error.json().message;
          if (!!error) return;
        });
    } else {
      this.catService.editCategory(this.pageInfoForm.value, this.editData.id)
        .subscribe( () => this.getRoutes(this.editData.id));
    }
  }
  public getRoutes(id) {
    Observable.forkJoin([
      this.catService.getCategoriesRoutes(id),
      this.catService.getCategoryById(id)
    ]).subscribe(([routes, categories]) => {
      this.categoryRoute = routes;
      this.mainSlug = categories.slug;
    });
  }
  public addRoute() {
    if (!this.routesForm.valid) return;
    let form = this.routesForm.value;
    let id = this.route.snapshot.params['id'];
    let body = { slug: form.slug };
    this.error = '';
    let obs = this.catService.addCategoriesRoutesPost(form, id);
    if (this.routesForm.value.primary) {
      obs = obs.flatMap(() => this.catService
        .editCategory(body, id)
      );
    }
    obs.subscribe(
      () => this.getRoutes(id),
      error => {
        this.error = error.json().message;
        if (!!error) return;
      });
    this.routesForm.reset();
  }
  public setPrimary(slug) {
    this.catService
      .editCategory({slug: slug}, this.route.snapshot.params['id'])
      .subscribe(res => this.getRoutes(this.route.snapshot.params['id']));
  }
}
