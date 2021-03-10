import { Component, OnInit } from '@angular/core';
import {ParkingService} from '../service/parking.service'
import {SlotService} from '../service/slot.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ParkingService,private api1:SlotService,private router: Router) { }
  isEditing : boolean = false;
  isEditing1 : boolean = true;
  intime    : string="";
  outtime   :string="";
  email : any;
  days:number=0;
  hours:number=0;
  amount:number=0;
  data:any=[]
  booking:any=[]
 slot:string="";
 size:number=0;
  ngOnInit(): void {
    this.api1.getslot().subscribe( data =>{
      console.log(data);
      this.data=data
      for(let i=0;i<this.data.length;i++){
        this.size=this.size+this.data[i].slot
      }
    },
    error => console.log(error));

    this.api.getbooking().subscribe( data =>{
      console.log(data);
      this.booking=data;
      for(let i=0;i<this.booking.length;i++){
        (<HTMLInputElement>document.getElementById(this.booking[i].parkingslot)).style.backgroundColor="red";
        (<HTMLInputElement>document.getElementById(this.booking[i].parkingslot)).innerHTML="Booked"

      }
    },
    error => console.log(error));
  }
  
  toggleModal(index:string){
    this.isEditing1=false;
    console.log(index)
    for(let i=0;i<this.booking.length;i++){
      if(index==this.booking[i].parkingslot){
        alert("Slot already Booked")   
      } 
    }
    this.isEditing = !this.isEditing;
    this.slot=index;
  }
  book(){
    
    var d1:any=this.intime.slice(0,10);
    var d2:any=this.outtime.slice(0,10);
    let t1= new Date(d1)
    let t2= new Date(d2)
    var numberOfHours=(Number(t2) - Number(t1)) / 36e5;
    var days=Math.floor(numberOfHours/24);
    var Remainder=numberOfHours % 24;
    var hours=Math.floor(Remainder);
    this.isEditing = false;
   var amount=numberOfHours*5;
    this.email=localStorage.getItem('email');
    this.api.booking(this.email,days,amount ,this.slot,this.intime,this.outtime).subscribe( data =>{
      alert("Your Booking Details :: "+JSON.stringify(data));
      this.isEditing1=true;
      this.router.navigate(['/login'])
    },
    error => console.log(error));
  }
  
}
