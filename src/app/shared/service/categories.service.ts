import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CategoriesService {
  public catUrl = 'http://api.reklambutiken.com/v1/categories/';
  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
  public getCategories(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.catUrl}${id}/subcategories`, this.requestOptions() )
      .map(res => res.json());
  }
}
