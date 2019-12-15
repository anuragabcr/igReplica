import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allPost;
  users;

  constructor(private userService: UserService,
              private dashboardServie: DashboardService) { }

  ngOnInit() {
    this.getPosts();
    this.getAllUsers();
  }

  getAllUsers() {
    this.dashboardServie.allUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

  showCommentPosted() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  getPosts() {
    this.userService.getPost()
      .subscribe(
        data => {
          this.allPost = data;
        },
        err => {
          console.log(err);
        }
      )
  }

  addComment(id) {
    var com = (<HTMLInputElement> document.getElementById('comment')).value;
    console.log(com);
    if(com !== '') {
      this.showCommentPosted();
      (<HTMLInputElement> document.getElementById('comment')).value = '';
      this.userService.addComment({id: id, comment: com});
    }
  }

  follow(id, status) {
    if(status === 'Follow') {
      this.dashboardServie.follow({id: id});
      this.getAllUsers();
    }
    else {
      if(confirm('are you sure you want to unfollow him ?')) {
        this.dashboardServie.unfollow({id: id});
        this.getAllUsers();
      }
    }
  }

  like(i) {
    console.log(i);
  }

}
