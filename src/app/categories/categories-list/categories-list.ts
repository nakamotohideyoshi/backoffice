import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../shared/service/categories.service';


@Component({
  selector: 'categories-list',
  styleUrls: [ './categories-list.style.scss' ],
  templateUrl: './categories-list.template.html'
})

export class CategoriesList implements OnInit, OnDestroy {
  public categories;
  static memberBreadcrumbs: any[] = [];
  public breadcrumbs = [];
  constructor(private catService: CategoriesService,
              private routeActiv: ActivatedRoute,
              private router: Router) {}
  ngOnInit(): void {
    this.routeActiv.params
    .switchMap(({id}) => {
      if (!parseInt(id, 10)) {
        this.breadcrumbs = [];
        CategoriesList.memberBreadcrumbs = [];
      } else {
        let step = -1;
        this.breadcrumbs.forEach((item, key) => {
          if (item.id === id) step = key;
        });
        if (step !== -1) this.breadcrumbs.splice(step + 1);
      }
      return this.catService.getCategoriesSubcategories(id);
    })
    .subscribe(res => { this.categories = res.categories; });
    this.breadcrumbs = CategoriesList.memberBreadcrumbs;
  }
  ngOnDestroy(): void {
    CategoriesList.memberBreadcrumbs = this.breadcrumbs;
  }
  public nextCategories(label, id) {
    if (!this.breadcrumbs.length) this.breadcrumbs.push({label: 'Main', id: 0});
    this.breadcrumbs.push({label: label, id: id});
    this.router.navigate(['app/categories/', id]);
  }
  public navigateBreadcrumbs(key, id) {
    if (!key) { this.breadcrumbs = [];
    } else this.breadcrumbs.splice(key + 1);
    this.router.navigate(['app/categories/', id]);
  }
}


