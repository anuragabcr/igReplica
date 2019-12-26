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
  currentUser;

  constructor(private userService: UserService,
              private dashboardServie: DashboardService) { }

  ngOnInit() {
    this.getPosts();
    this.getAllUsers();
    this.getCurrentUser();
  }

  getAllUsers() {
    this.dashboardServie.allUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        err => {
          console.log(err);
        }
      )
  }

  showSnackbar(i) {
    var msg = ['Comment posted successfully','Sharing post is not available yet','Bookmarking post is not available'];
    //console.log(document.getElementById(id));
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    //Add snackbar message
    x.innerText = msg[i];
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
    var com = ((<HTMLInputElement> document.getElementById('comment')).value).trim();
    console.log(com);
    if(com !== '') {
      this.showSnackbar(0);
      (<HTMLInputElement> document.getElementById('comment')).value = '';
      this.userService.addComment({id: id, comment: com});
    }
  }

  follow(id, status) {
    if(status === 'Follow') {
      this.dashboardServie.follow({id: id})
        .subscribe(
          data => {
            this.getAllUsers();
            this.getPosts();
          }
        )
    }
    else {
      if(confirm('are you sure you want to unfollow him ?')) {
        this.dashboardServie.unfollow({id: id})
          .subscribe(
            data => {
              this.getAllUsers();
              this.getPosts();
            }
          )
      }
    }
  }

  like(id, status) {
    if(status) {
      this.dashboardServie.unlike({id: id})
        .subscribe(
          data => {
            this.getPosts();
          }
        )
    }
    else {
      this.dashboardServie.like({id: id})
        .subscribe(
          data => {
            this.getPosts();
          }
        )
    }
  }

  getCurrentUser() {
    this.userService.getUser()
      .subscribe(
        data => {
          this.currentUser = data;
        },
        err => {
          console.log(err);
        }
      )
  }

}
