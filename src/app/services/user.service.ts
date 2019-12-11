import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/';


  constructor(private http: HttpClient,
              private router: Router) { }

  addPost(userData) {
    const postData = new FormData();
    postData.append('title', userData.title);
    postData.append('description', userData.description);
    postData.append('url', userData.url);
    this.http.post(this.url + 'post', postData)
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
    return this.http.get(this.url + 'post');
  }

  getUser() {
    return this.http.get(this.url + 'users');
  }

  changePassword(newPassword) {
    return this.http.put(this.url + 'users/password', newPassword);
  }

  uploadImage(file) {
    const img = new FormData();
    img.append('img',file);
    this.http.put(this.url + 'users/image', img)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  removeImage() {
    this.http.delete(this.url + 'users/image')
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  changeAbout(about) {
    this.http.put(this.url + 'users/about', about)
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
