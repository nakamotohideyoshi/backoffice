import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../shared/service/categories.service';

@Component({
  selector: 'categories',
  styleUrls: [ './categories.style.scss' ],
  templateUrl: './categories.template.html'
})
export class CategoriesComponent implements OnInit {
  public categories;
  constructor(private catService: CategoriesService, private routeActiv: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.catService.getCategories(this.routeActiv.snapshot.params['id']).subscribe(res => {
      this.categories = res.categories;
    });
  }
}


