import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/post';


  constructor(private http: HttpClient,
              private router: Router) { }

  addPost(userData) {
    const postData = new FormData();
    postData.append('title', userData.title);
    postData.append('description', userData.description);
    postData.append('url', userData.url);
    this.http.post(this.url, postData)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log('data not successfully posted');
        }
      )
  }

  getPost() {
    return this.http.get(this.url);
  }

}
