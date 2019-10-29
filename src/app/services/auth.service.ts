import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  signup(userData): Observable<any> {
    var returnData = new Subject();
    this.http.post(this.url + 'signup', userData)
      .subscribe(
        data => {
          returnData.next(data);
        },
        err => {
          returnData.next(err.error);
        }
      );
    return returnData.asObservable();
  }

  login(userData): Observable<any> {
    var returnData = new Subject();
    this.http.post(this.url + 'login', userData)
      .subscribe(
        data => {
          console.log(data);
          returnData.next(data);
        },
        err => {
          console.log(err.error);
          returnData.next(err.error);
        }
      );
    return returnData.asObservable();
  }
}
