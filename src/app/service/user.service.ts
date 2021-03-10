import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/parking/user/';
  private loginUrl = 'http://localhost:8080/parking/user/login';

  constructor(private http: HttpClient) { }
  register(data :any) {
    console.log("Api call working");
     const obj = {email: data.email,password:data.password,firstName:data.firstname,lastName:data.lastname,phone:data.number,role:1};
    return this.http.post(`${this.baseUrl}`,obj);
  }
  login(data:any){
    console.log("Login call working");
     const obj = {email: data.email,password:data.password};
    return this.http.post(`${this.loginUrl}`,obj);
  }
  
}
