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
      (<HTMLInputElement> document.getElementById('comment')).value = '';
      this.userService.addComment({id: id, comment: com});
    }
  }

  like(i) {
    console.log(i);
  }

}
