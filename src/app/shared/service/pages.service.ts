import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class PagesService {

  private apiUrl = 'http://api.reklambutiken.com/v1/';

  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  public getPages() {
    return this.http.get(`${this.apiUrl}pages`, this.requestOptions())
      .map(res => res.json());
  }

  public getPageById(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.apiUrl}pages/${id}`, this.requestOptions() )
      .map(res => res.json());
  }

  public updatePage(body, id?) {
    if (!id) id = 0;
    return this.http.put(`${this.apiUrl}pages/${id}`, body, this.requestOptions())
      .map(res => res.json());
  }

  public createPage(body) {
    return this.http.post(`${this.apiUrl}pages`, body, this.requestOptions())
      .map(res => res.json());
  }
}
