import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/service/categories.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'add-routes',
  styleUrls: [ './add-routes.style.scss' ],
  templateUrl: './add-routes.template.html'
})
export class AddRoutesCategories implements OnInit {
  public categoriesRoutes: any;
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
    this.getRoutes();
  }
  public getRoutes() {
    this.categoriesService.getCategoriesRoutes(this.routeActiv.snapshot.params['id'])
      .subscribe(res => {
        this.categoriesRoutes = res;
      });
    this.categoriesService.getCategories(this.routeActiv.snapshot.params['id'])
      .subscribe(res => {
        this.mainSlug = res.slug;
      });
  }
  public addRoutes() {
    if (!this.routesForm.valid) return;
    this.error = '';
    this.categoriesService
      .addCategoriesRoutesPost(this.routesForm.value, this.routeActiv.snapshot.params['id'])
      .subscribe(res => {
        if (this.routesForm.value.primary) {
          this.setPrimary(
            this.routesForm.value.slug
          );
          return;
        }
      }, error => {
        this.error = error.json().message;
        if (!!error) return;
      });
    this.getRoutes();
  }
  public setPrimary(slug) {
    this.categoriesService
      .setCategoriesRoutesPut(slug, this.routeActiv.snapshot.params['id'])
      .subscribe(res => this.getRoutes());
  }
}
