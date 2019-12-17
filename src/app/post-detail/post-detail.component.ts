import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId;
  postDetail;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
    this.postId = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.userService.getPostById({id: this.postId})
      .subscribe(
        data => {
          this.postDetail = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
  }

}
