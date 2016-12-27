import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';


@Component({
  selector: 'categories-list',
  styleUrls: [ './categories-list.style.scss' ],
  templateUrl: './categories-list.template.html'
})
export class CategoriesList implements OnInit {
  public categories;
  constructor(private catService: CategoriesService,
              private routeActiv: ActivatedRoute) {}
  ngOnInit(): void {
    this.catService.getCategoriesSubcategories(
      this.routeActiv.snapshot.params['id']
    ).subscribe(res => {
      this.categories = res.categories;
    });
  }
}


