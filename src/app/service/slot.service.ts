import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private baseUrl = 'http://localhost:8080/parking/slot/';

  constructor(private http: HttpClient) { }
 
  getslot(){
    return this.http.get(`${this.baseUrl}`);

  }
 createslot(data :any) {
    console.log("Api call working");
     const obj = {email: localStorage.getItem('email'),alemail:data.email,slot:data.slot,phone:data.number};
    return this.http.post(`${this.baseUrl}`,obj);
  }

}
