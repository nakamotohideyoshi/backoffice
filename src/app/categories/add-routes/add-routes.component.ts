import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/service/categories.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'add-routes',
  styleUrls: [ './add-routes.style.scss' ],
  templateUrl: './add-routes.template.html'
})
export class AddRoutesCategories implements OnInit {
  public categoryRoute: any;
  public error = '';
  public mainSlug = '';
  public routesForm: FormGroup;
  constructor(private categoriesService: CategoriesService,
              private routeActiv: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.routesForm = this.formBuilder.group({
      slug: [ '', Validators.required ],
      primary: false
    });
  }
  ngOnInit(): void {
    this.routeActiv.params
      .switchMap(({ id }) =>
        Observable.forkJoin([
          this.categoriesService.getCategoriesRoutes(id),
          this.categoriesService.getCategoryById(id)
        ])
      )
      .subscribe(([routes, categories]) => {
        this.categoryRoute = routes;
        this.mainSlug = categories.slug;
      });
  }
  public getRoutes(id) {
    Observable.forkJoin([
      this.categoriesService.getCategoriesRoutes(id),
      this.categoriesService.getCategoryById(id)
    ]).subscribe(([routes, categories]) => {
      this.categoryRoute = routes;
      this.mainSlug = categories.slug;
    });
  }
  public addRoute() {
    if (!this.routesForm.valid) return;
    let form = this.routesForm.value;
    let id = this.routeActiv.snapshot.params['id'];
    let body = { slug: form.slug };
    this.error = '';
    let obs = this.categoriesService.addCategoriesRoutesPost(form, id);
    if (this.routesForm.value.primary) {
      obs = obs.flatMap(() => this.categoriesService
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
    this.categoriesService
      .editCategory({slug: slug}, this.routeActiv.snapshot.params['id'])
      .subscribe(res => this.getRoutes(this.routeActiv.snapshot.params['id']));
  }
}
