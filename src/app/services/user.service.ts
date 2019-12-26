import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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

  getPostById(postId) {
    return this.http.post(this.url + 'post/postById', postId);
  }

  getUser() {
    return this.http.get(this.url + 'users');
  }

  getUserById(userId) {
    return this.http.post(this.url + 'users/getById', userId);
  }

  changePassword(newPassword) {
    return this.http.put(this.url + 'users/password', newPassword);
  }

  uploadImage(file) {
    const img = new FormData();
    img.append('img',file);
    return this.http.put(this.url + 'users/image', img);
  }

  removeImage() {
    return this.http.delete(this.url + 'users/image');
  }

  changeAbout(about) {
    return this.http.put(this.url + 'users/about', about);
  }

  addComment(comment) {
    var temp = new Subject();
    this.http.post(this.url + 'post/comment', comment)
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
