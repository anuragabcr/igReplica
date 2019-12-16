import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post(this.url + 'follow', userId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }
  
  unfollow(userId) {
    this.http.post(this.url + 'unfollow', userId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  like(postId) {
    this.http.post(this.url + 'like', postId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  unlike(postId) {
    this.http.post(this.url + 'unlike', postId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

}
