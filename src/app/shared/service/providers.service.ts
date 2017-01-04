import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class ProvidersService {

  private apiUrl = 'http://api.reklambutiken.com/v1/';

  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  public getProviders() {
    return this.http.get(`${this.apiUrl}providers`, this.requestOptions())
      .map(res => res.json());
  }
}
