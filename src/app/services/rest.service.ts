import { Injectable } from '@angular/core';
import { Http,ResponseContentType } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private loginData:any = {};  
  constructor(private http: Http) {
      this.loginData = localStorage.getItem("login")  
  }

  SignUp(signUpData){
    return this.http.post("http://192.168.0.21:3000/signup",signUpData,{withCredentials: true});
  }  
  signIn(signInData){
    return this.http.post("http://104.194.106.22:80/rideshare/Login", signInData,{withCredentials: true});
  }
  signUp(signUpData){
    return this.http.post("http://192.168.0.21:3000/signup", signUpData);
  }
  getAllDrivers(){
    return this.http.get("http://192.168.0.21:3000/signup");    
  }
  bookACab(rideDetails){
    return this.http.post("http://192.168.0.21:3000/bookCab", rideDetails);
  }
  cancelRide(rideDetails){
    return this.http.post("http://192.168.0.21:3000/cancel/ride", rideDetails);    
  }  
  getDashBoardDataForCustomers(){
    return this.http.get("http://192.168.0.21:3000/getDashBoardData/Customers");        
  }
}

/*curl -X POST -d "{"username":"maneeshd","password":"qwerty","usertype":"customer"}" http://104.194.106.22:80/rideshare/Login*/
