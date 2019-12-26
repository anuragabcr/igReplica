import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId;
  postDetail;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dashboardServie: DashboardService) {
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
        },
        err => {
          console.log(err);
        }
      )
  }

  addComment() {
    var com = ((<HTMLInputElement> document.getElementById('comment')).value).trim();
    console.log(com);
    if(com !== '') {
      this.showSnackbar(0);
      (<HTMLInputElement> document.getElementById('comment')).value = '';
      this.userService.addComment({id: this.postId, comment: com})
        .subscribe(
          data => {
            this.getPost();
          }
        )
    }
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

  like(status) {
    if(status) {
      this.dashboardServie.unlike({id: this.postId})
        .subscribe(
          data => {
            this.getPost();
          }
        )
    }
    else {
      this.dashboardServie.like({id: this.postId})
        .subscribe(
          data => {
            this.getPost();
          }
        )
    }
  }

}
