import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../shared/service/products.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'products-routes',
  styleUrls: ['./products-routes.style.scss'],
  templateUrl: './products-routes.template.html',
})
export class ProductsRoutesComponent implements OnInit {
  public routes;
  public addRouteForm: FormGroup;
  public error;
  public primaryRoute;

  constructor(private productsRoutesService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
    this.addRouteForm = this.fb.group({
      slug: ['', Validators.required],
      primary: false
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap(({ id }) =>
        Observable.forkJoin([
          this.productsRoutesService.getRoutes(id),
          this.productsRoutesService.getProduct(id)]))
      .subscribe(([routes, product]) => {
        this.routes = routes;
        this.primaryRoute = product.slug;
      });


  }

  private getRoutes(id) {
    Observable.forkJoin([
      this.productsRoutesService.getRoutes(id),
      this.productsRoutesService.getProduct(id)])
      .subscribe(([routes, product]) => {
        this.routes = routes;
        this.primaryRoute = product.slug;
      });
  }

  private addRoute() {

    let form = this.addRouteForm.value;
    let id = this.activatedRoute.snapshot.params['id'];
    let body = { slug: form.slug };

    let obs = this.productsRoutesService.addRoute(id, body);

    if (form.primary) obs = obs.flatMap(() => this.productsRoutesService.updateProduct(id, body));

    obs.subscribe(
      () => this.getRoutes(id),
      error => {
          this.error = error.json().message;
          if (!!error) return;
      });

    this.addRouteForm.reset();
  }

  private setPrimaryRoute(slug) {

    let id = this.activatedRoute.snapshot.params['id'];

    this.productsRoutesService.updateProduct(id, { slug: slug })
      .subscribe(res => this.getRoutes(id));
  }
}
