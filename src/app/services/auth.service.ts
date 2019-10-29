import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  signup(userData) {
    this.http.post(this.url + 'signup', userData)
      .subscribe(
        data => {
          console.log(data);
          return data;
        },
        err => {
          console.log(err);
        }
      );
  }
}
