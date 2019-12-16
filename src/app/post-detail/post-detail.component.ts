import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  productId;

  constructor(private route: ActivatedRoute) {
    this.productId = this.route.snapshot.params.id;
   }

  ngOnInit() {
    console.log(this.productId);
  }

}
