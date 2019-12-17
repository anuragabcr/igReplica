import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;

  url = 'http://igreplicaserver-env.mwmzxmpdhm.us-east-2.elasticbeanstalk.com/';

  constructor(private http: HttpClient,
              private route: Router) { }

  signup(userData): Observable<any> {
    var returnData = new Subject();
    this.http.post(this.url + 'auth/signup', userData)
      .subscribe(
        data => {
          returnData.next(data);
          this.token = data;
          this.saveAuthToken(this.token.token);
        },
        err => {
          returnData.next(err.error);
        }
      );
    return returnData.asObservable();
  }

  login(userData): Observable<any> {
    var returnData = new Subject();
    this.http.post(this.url + 'auth/login', userData)
      .subscribe(
        data => {
          returnData.next(data);
          this.token = data;
          this.saveAuthToken(this.token.token);
          this.route.navigate(['/dashboard']);
        },
        err => {
          returnData.next(err.error);
        }
      );
    return returnData.asObservable();
  }

  logout() {
    this.clearAuthToken();
    this.route.navigate(['/']);
  }

  private saveAuthToken(token) {
    localStorage.setItem('token', token);
  }
  private clearAuthToken() {
    localStorage.removeItem('token');
  }
  getAuthToken() {
    return localStorage.getItem('token');
  }

  resetPass(authData) {
    var returnData = new Subject();
    this.http.post(this.url+'auth/reset', authData)
      .subscribe(
        data => {
          returnData.next(data);
        },
        err => {
          console.log(err);
        }
      );
    return returnData.asObservable();
  }

}
