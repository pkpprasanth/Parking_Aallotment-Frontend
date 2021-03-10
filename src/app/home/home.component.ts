import { Component, OnInit } from '@angular/core';
import {ParkingService} from '../service/parking.service'
import {SlotService} from '../service/slot.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ParkingService,private api1:SlotService) { }
  isEditing : boolean = false;
  isEditing1 : boolean = true;
  intime    : string="";
  outtime   :string="";
  email : any;
  days:number=0;
  hours:number=0;
  amount:number=0;
  data:any=[]
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
  }
  
  toggleModal(index:string){
    console.log(index)
    this.isEditing = !this.isEditing;
    this.slot=index;
  }
  book(){
    let div: HTMLDivElement = document.getElementById(this.slot) as HTMLDivElement;
    console.log(div)
    div.style.backgroundColor="red";
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
    this.api.booking(this.email,this.days,amount ,this.slot,this.intime,this.outtime).subscribe( data =>{
      console.log(data);
      this.isEditing1 = false;
    },
    error => console.log(error));
  }
  
}
