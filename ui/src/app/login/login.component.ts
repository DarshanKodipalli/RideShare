import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string="";
  private loginData:any = {};
  private signUpData:any = {};
  constructor(private app: AppComponent,
            private http: RestService,
            private router: Router ) { 
    this.signUpData.username = "Dion Wilson";
    this.signUpData.password = "password";
    this.signUpData.email = "d.wilson@gmail.com";
    this.signUpData.phone = "3892723487";
    this.signUpData.creditCard = "123412353462";
  }

  ngOnInit() {
    this.loginData.username = "Steve";
    this.loginData.password = "password";
    this.loginData.usertype = "driver";
    setTimeout(() => {
      this.app.removeLoggedIn();
    } , 0);
    
  }

  login(loginData){
    if(loginData.username === "RideShareApplicationAdmin"){
      loginData.role = "admin";
      loginData.city = "Chicago";
      loginData.state = "Illinois";  
      loginData.username = "RideShareCustomer";

      localStorage.setItem("login",JSON.stringify(loginData));
      this.router.navigate(['/dashboard']);
      console.log(loginData);
    }else{
    this.http.signIn(loginData).subscribe(
      (response)=>{
        console.log(response.json());
        loginData.token = response.json().token;
        loginData.role = response.json().usertype;
        loginData.city = "Chicago";
        loginData.state = "Illinois";  
        localStorage.setItem("login",JSON.stringify(loginData));
        if(response.json().usertype === 'driver'){
          this.router.navigate(['/driverDashboard']);
        }else{
          this.router.navigate(['/dashboard']);          
        }
        console.log(loginData);        
      },(error)=>{
        console.log(error);
      });
    }
  }
  signUpFunction(signUpData){
    signUpData.usertype = "customer";
    this.http.registerUser(signUpData).subscribe(
      (response)=>{
        console.log(response.json());
        window.alert("User Registered! Please login to Book a cab.");
      },(error)=>{
        console.log(error);
      })
  }
}
