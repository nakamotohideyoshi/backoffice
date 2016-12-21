import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Auth {
  constructor(private http: Http) {

  }

  public login(data) {
    return this.http
      .post('http://api.reklambutiken.com/v1/login',
        { 'username': data.login, 'password': data.password}
      )
      .map(res => res.json())
      .map(res => {
        try {
          if (res.token !== '') this.addingTokenLS(res.token);
        } catch (e) {
          console.log(e);
        }
      });
  }
  public logOut() {
    this.removingTokenLS();
  }
  private addingTokenLS(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  private removingTokenLS() {
    localStorage.removeItem('token');
  }


}
