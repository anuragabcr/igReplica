import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;

  url = 'http://localhost:3000/';

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

  post(userData) {
    const postData = new FormData();
    postData.append("title", userData.title);
    postData.append("description", userData.description);
    postData.append("url", userData.url);
    console.log(userData);
    this.http.post(this.url + 'post', postData)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

}
