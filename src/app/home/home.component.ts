import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  openSignup = true;
  openLogin = false;

  constructor() { }

  ngOnInit() {
  }

  openLoginPage() {
    this.openLogin = true;
    this.openSignup = false;
  }

  openSignupPage() {
    this.openSignup = true;
    this.openLogin = false;
  }

}
