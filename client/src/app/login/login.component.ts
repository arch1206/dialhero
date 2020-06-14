import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobleService } from 'src/service/globle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error:String;
  constructor(private service: GlobleService, private route: Router, private fbuilder: FormBuilder){
    this.buildForm();
    this.error = "";
  }

  ngOnInit() {
  }
  buildForm() {
    this.loginForm = this.fbuilder.group(
      {
        'username': ['', [Validators.required, Validators.minLength(4)]],
        'password': ['', [Validators.required, Validators.maxLength(12)]]
      }
    );
  }
  login()
  {
    this.service.login(this.loginForm.value, (msg) => {
      console.log(msg)
      if (msg == "SUCCESS") {
        this.route.navigate(["list"]);
      } else {
        this.error = msg;
        this.loginForm.reset();
      }
    });
  }
  get f() { return this.loginForm.controls; }
}
