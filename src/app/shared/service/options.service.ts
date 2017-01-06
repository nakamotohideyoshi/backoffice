import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class OptionsService {
  public baseUrl = 'http://api.reklambutiken.com/v1/';
  constructor(private http: Http) {}
  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
  public getListOptions() {
    return this.http.get(`${this.baseUrl}printing/options`, this.requestOptions())
      .map( res => res.json());
  }
  public createOption(body) {
    return this.http.post(`${this.baseUrl}printing/options`, body, this.requestOptions())
      .map( res => res.json());
  }
}
