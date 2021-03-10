import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import {UserService} from '../service/user.service'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  hide: boolean = false;

  constructor(private fb: FormBuilder,private router:Router,private api:UserService) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(1)]],
    number: ['', [Validators.required, Validators.minLength(10)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.api.register(this.loginForm.value).subscribe( data =>{
      console.log(data);
      this.router.navigate(['/login'])
    },
    error => console.log(error));
  }

}
