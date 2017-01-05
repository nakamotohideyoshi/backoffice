import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class ProductsService {

  private apiUrl = 'http://api.reklambutiken.com/v1/';

  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  public getRoutes(id) {
    return this.http.get(`${this.apiUrl}routes/product/${id}`, this.requestOptions())
      .map(res => res.json());
  }

  public addRoute(id, body) {
    return this.http.post(`${this.apiUrl}routes/product/${id}`, body, this.requestOptions())
      .map(res => res.json());
  }

  public updateProduct(id, body) {
    return this.http.put(`${this.apiUrl}products/${id}`, body, this.requestOptions())
      .map(res => res.json());
  }

  public getProduct(id) {
    return this.http.get(`${this.apiUrl}products/${id}`, this.requestOptions())
      .map(res => res.json());
  }

  public getProducts() {
    return this.http.get(`${this.apiUrl}products`, this.requestOptions())
      .map(res => res.json());
  }

  public  getProductPrices(id) {
    return this.http.get(`${this.apiUrl}products/${id}/prices`, this.requestOptions())
      .map(res => res.json());
  }
}

