import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:3000/dashboard/';

  constructor(private http: HttpClient) { }

  allUsers() {
    return this.http.get(this.url + 'accounts');
  }

  follow(userId) {
    var temp = new Subject();
    this.http.post(this.url + 'follow', userId)
      .subscribe(
        data => {
          temp.next(data);
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    return temp.asObservable();
  }
  
  unfollow(userId) {
    var temp = new Subject();
    this.http.post(this.url + 'unfollow', userId)
      .subscribe(
        data => {
          temp.next(data);
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    return temp.asObservable();
  }

  like(postId) {
    var temp = new Subject();
    this.http.post(this.url + 'like', postId)
      .subscribe(
        data => {
          temp.next(data);
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    return temp.asObservable();
  }

  unlike(postId) {
    var temp = new Subject();
    this.http.post(this.url + 'unlike', postId)
      .subscribe(
        data => {
          temp.next(data);
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    return temp.asObservable();
  }

}
