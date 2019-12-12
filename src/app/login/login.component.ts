import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataReturned = {
    msg: '',
    status: false
  };
  resetDataReturned = {
    msg: '',
    status: false
  };

  temp;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  passResetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
    rePass: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        data => {
          console.log(data);
          this.dataReturned.msg = data.error;
          this.dataReturned.status = true;
        },
        err => {
          console.log(err);
        }
      )
  }

  resetPass() {
    if(this.passResetForm.get('pass').value === this.passResetForm.get('rePass').value) {
      this.resetDataReturned.status = false;
      this.authService.resetPass({email: this.passResetForm.get('email').value, password: this.passResetForm.get('pass').value})
        .subscribe(
          data => {
            this.temp = data;
            if(this.temp.status) {
              this.resetDataReturned.status = false;
              alert('Password reset successfully...');
              document.getElementById('cancel').click();
            }
            else {
              this.resetDataReturned.status = true;
              this.resetDataReturned.msg = this.temp.msg;
            }
          }
      )
    }
    else {
      this.resetDataReturned.status = true;
      this.resetDataReturned.msg = 'Both password must match';
    }
  }

  facebook() {
    alert('Login with Facebook not Supported yet\nKindly create an account or Login...');
  }

}
