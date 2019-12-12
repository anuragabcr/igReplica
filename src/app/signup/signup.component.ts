import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  dataReturned = {
    msg: '',
    status: false
  };
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    var a = this.authService.signup(this.signupForm.value);
    a.subscribe(
      data => {
        console.log(data);
        if(data.status) {
          alert('Account have been created Successfully\n Go to Login page...');
          this.signupForm.reset();
          this.dataReturned.status = false;
        }
        else {
          this.dataReturned.msg = data.error;
          this.dataReturned.status = true;
        }
      }
    )
  }

  facebook() {
    alert('Login with Facebook Not Supported yet\nKindly Create an account or Login...');
  }

}
