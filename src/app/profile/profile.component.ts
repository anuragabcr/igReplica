import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  err = {
    status: false,
    msg : ''
  };
  passChange;
  user;
  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    rePassword: ['', [Validators.required, Validators.minLength(8)]],
    oldPassword: ['', [Validators.required]]
  });

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder,
              private route: Router) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(
        data => {
          this.user = data;
          console.log(this.user);
        },
        err => {
          console.log(err);
        }
      )
  }

  logout() {
    document.getElementById('close').click();
    this.authService.logout();
  }

  changePassword() {
    this.err.status = false;
    if(this.passwordForm.get('password').value === this.passwordForm.get('rePassword').value) {
      this.userService.changePassword({newPassword: this.passwordForm.get('password').value, oldPassword: this.passwordForm.get('oldPassword').value})
        .subscribe(
          data => {
            this.passChange = data;
            console.log(data);
            if(this.passChange.status) {
              document.getElementById('cancel').click();
              alert(this.passChange.msg);
            }
            else {
              this.err.status = true;
              this.err.msg = this.passChange.msg;
            }
          },
          err => {
            console.log(err);
          }
        )
    }
    else {
      console.log('Both Password not match');
      this.err.status = true;
      this.err.msg = 'Both Password not match';
    }
  }

  uploadImage(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userService.uploadImage(file);
    document.getElementById('closeM').click();
    this.route.navigate(['/profile']);
  }

  removeImage() {
    this.userService.removeImage();
    document.getElementById('closeM').click();
  }

  changeAbout() {
    var inp = (<HTMLInputElement>document.getElementById('about')).value;
    this.userService.changeAbout({about: inp});
  }

}
