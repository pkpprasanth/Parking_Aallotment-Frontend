import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://localhost:8080/parking/parking/';
  constructor(private http: HttpClient) { }
  booking(email:string,days:number,amount:number,slot:string,intime:any,outtime:any) {
    console.log("Booking call working");
     const obj = {email: email,totaldays:days,amount:amount,parkingslot:slot,intime:intime,outtime:outtime};
    return this.http.post(`${this.baseUrl}`,obj);
  }
  getbooking(){
    return this.http.get(`${this.baseUrl}`);

  }
}
