import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class BadgesService {

  private apiUrl = 'http://api.reklambutiken.com/v1/';

  constructor(private http: Http) {
  }

  public requestOptions(): RequestOptionsArgs {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token, 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  public getBadges() {
    return this.http.get(`${this.apiUrl}badges`, this.requestOptions())
      .map(res => res.json());
  }

  public getBadgeById(id?) {
    if (!id) id = 0;
    return this.http.get( `${this.apiUrl}badges/${id}`, this.requestOptions() )
      .map(res => res.json());
  }

  public updateBadge(body, id?) {
    if (!id) id = 0;
    return this.http.put(`${this.apiUrl}badges/${id}`, body, this.requestOptions());
  }

  public createBadge(body) {
    return this.http.post(`${this.apiUrl}badges`, body, this.requestOptions())
      .map(res => {
        res.json()
      });
  }
}
