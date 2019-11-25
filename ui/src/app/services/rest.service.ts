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
    return this.http.post("http://localhost/rideshare/Register",signUpData,{withCredentials: true});
  }  
  signIn(signInData){
    return this.http.post("http://localhost/rideshare/Login", signInData);
  }
  getAllRides(data){
    return this.http.post("http://localhost/rideshare/GetAllRides", data);    
  }
  getAllRidesForAdmin(){
    return this.http.get("http://localhost/rideshare/GetAllRides");        
  }
  getAllDrivers(){
    return this.http.get("http://192.168.0.21:3000/signup");    
  }
  bookACab(rideDetails){
    return this.http.post("http://localhost/rideshare/BookCab", rideDetails);
  }
  cancelRide(rideDetails){
    return this.http.post("http://localhost/rideshare/CancelRide", rideDetails);    
  }  
  getDataForDashboard(customerName){
    return this.http.post("http://localhost/rideshare/Dashboard", customerName);        
  }
  getDriversInformation(){
    return this.http.get("http://localhost/rideshare/GetAllDrivers");    
  }
  getEstimatedPrice(rideDetails){
    console.log(rideDetails);
    return this.http.post("http://localhost:5555/estimate_fare/api/v1/get_fare_estimate", rideDetails);
  }
  UpdateUserRating(ratingSetails){
    return this.http.post("http://localhost/rideshare/UpdateUserRating", ratingSetails);        
  }
  getDriverDashboardData(driverName){
    return this.http.post("http://localhost/rideshare/DriverDashboard", driverName);        
  }
  registerDriver(driverDetails){
    return this.http.post("http://localhost/rideshare/Register", driverDetails);            
  }
  registerUser(userDetails){
    return this.http.post("http://localhost/rideshare/Register", userDetails);                
  }
  searchBasedOnDriver(driverName){
    return this.http.post("http://localhost/rideshare/SearchRecord", driverName);                    
  }
}

/*curl -X POST -d "{"username":"maneeshd","password":"qwerty","usertype":"customer"}" http://104.194.106.22:80/rideshare/Login*/
