import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import {UserService} from '../service/user.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder,private router: Router,private api:UserService) {
   
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
    this.api.login(this.loginForm.value).subscribe( data =>{
      console.log(data);
      localStorage.setItem("email",this.loginForm.value.email)
      if(data)
      {
        this.router.navigate(['/home'])
      }
      else{
        alert("Invalid Login Credentials")
      }

    },
    error => console.log(error));
  }
  

}
