import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      var temp = {
        name: faker.name.findName(),
        img: faker.random.image(),
        com: faker.lorem.sentence(),
        avatar: faker.image.avatar()
      };
      this.data.push(temp);
    }
    this.dashboardService.test();
  }

}
