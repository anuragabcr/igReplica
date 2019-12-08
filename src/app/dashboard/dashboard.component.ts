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

  posts = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.userService.getPost()
      .subscribe(
        data => {
          console.log(data);
          for( var i in data){
            this.posts.push(data[i]);
          }
          /*for (let i = 0; i < 5; i++) {
            temp = {
              name: faker.name.findName(),
              img: faker.random.image(),
              com: faker.lorem.sentence(),
              avatar: faker.image.avatar()
            };
            this.data.push(temp);
          }*/
        },
        err => {
          console.log(err);
        }
      )
  }

  like(i) {
    console.log(i);
  }

}
