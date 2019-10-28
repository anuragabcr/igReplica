import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ing  = faker.image.people();
  ava = faker.image.avatar();

  constructor() { }

  ngOnInit() {
  }

}
