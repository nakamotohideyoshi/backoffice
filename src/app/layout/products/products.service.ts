import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProductsService {
  constructor (private http: Http) {}
  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
  public getProduct() {
    return this.http.get('http://api.reklambutiken.com/v1/products', this.requestOptions())
      .map(res => res.json());
  }
}
