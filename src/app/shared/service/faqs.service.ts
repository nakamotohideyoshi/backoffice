import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class FAQsService {

  private apiUrl = 'http://api.reklambutiken.com/v1/';

  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  public getFAQs() {
    return this.http.get(`${this.apiUrl}faq/posts`, this.requestOptions())
      .map(res => res.json());
  }

  public getFAQById(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.apiUrl}faq/posts/${id}`, this.requestOptions() )
      .map(res => res.json());
  }

  public updateFAQ(body, id?) {
    if (!id) id = 0;
    return this.http.put(`${this.apiUrl}faq/posts/${id}`, body, this.requestOptions())
      .map(res => res.json());
  }

  public createFAQ(body) {
    return this.http.post(`${this.apiUrl}faq/posts`, body, this.requestOptions())
      .map(res => res.json());
  }
}
