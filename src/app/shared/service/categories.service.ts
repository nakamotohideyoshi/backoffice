import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CategoriesService {
  public catUrl = 'http://api.reklambutiken.com/v1/';
  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
  public getCategories(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.catUrl}categories/${id}`, this.requestOptions() )
      .map(res => res.json());
  }
  public getCategoriesSubcategories(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.catUrl}categories/${id}/subcategories`, this.requestOptions() )
      .map(res => res.json());
  }
  public getCategoriesRoutes(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.catUrl}routes/category/${id}`, this.requestOptions() )
      .map(res => res.json());
  }
  public addCategoriesRoutesPost(body, id?) {
    if (!id) id = 0;
    return this.http.post( `${this.catUrl}routes/category/${id}`,
      { slug: body['slug'] },
      this.requestOptions() )
      .map(res => res.json());
  }
  public setCategoriesRoutesPut(slug, id?) {
    if (!id) id = 0;
    return this.http.put(
      `${this.catUrl}categories/${id}`,
      { slug: slug },
      this.requestOptions()
    ).map(res => res.json());
  }
}

