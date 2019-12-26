import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  openSignup = true;
  openLogin = false;
  img;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginPageImg()
      .subscribe(
        data => {
          console.log(data);
          this.img = data;
        },
        err => {
          console.log(err);
        }
      )
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
