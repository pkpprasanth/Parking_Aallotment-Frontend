import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import {SlotService} from '../service/slot.service'

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private fb: FormBuilder,private router:Router,private api:SlotService) { }

  ngOnInit(): void {
  
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    slot: ['', [Validators.required, Validators.minLength(3)]],
    number: ['', [Validators.required, Validators.minLength(10)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value)
    this.api.createslot(this.loginForm.value).subscribe( data =>{
      console.log(data);
      this.router.navigate(['/home'])
    },
    error => console.log(error));
  }

}
