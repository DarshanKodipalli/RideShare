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
            private router: Router ) { }

  ngOnInit() {
    this.loginData.username = "maneeshd";
    this.loginData.password = "password";
    this.loginData.usertype = "customer";
    this.signUpData.userName = "Akhil C";
    this.signUpData.email = "a@b.com";
    setTimeout(() => {
      this.app.removeLoggedIn();
    } , 0);
    
  }

  login(loginData){

    if(loginData.username === "maneeshd"){
      loginData.role = "Customer";
      loginData.city = "Chicago";
      loginData.state = "Illinois";
    }else{
      loginData.role = "Admin";
      loginData.city = "Detroit";
      loginData.state = "Illinois";
    }
    localStorage.setItem("login",JSON.stringify(loginData));
    this.router.navigate(['/bookRide']);
/*      loginData.role = "Customer";
      loginData.city = "Chicago";
      loginData.state = "Illinois";
    this.http.signIn(loginData).subscribe(
      (response)=>{
        console.log(response.json());
        localStorage.setItem("login",JSON.stringify(loginData));
        this.router.navigate(['/dashboard']);
      },(error)=>{
        console.log(error);
      })*/
  }
}
