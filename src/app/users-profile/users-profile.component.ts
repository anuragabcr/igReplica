import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  userId;
  userData;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
    this.userId = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.userService.getUserById({id: this.userId})
      .subscribe(
        data => {
          console.log(data);
          this.userData = data;
        },
        err => {
          console.log(err);
        }
      )
  }

}
