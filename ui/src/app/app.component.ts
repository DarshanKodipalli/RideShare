import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadSpinner:boolean = true;
  loggedIn:boolean = false;
  role:string;
  constructor() {
    
  }

  ngOnInit(){
    this.role = JSON.parse(localStorage.getItem('login')).role;
    this.loadSpinner = false;
  }

  setLoggedIn(){
    this.loggedIn = true;
  }

  removeLoggedIn(){
    this.loggedIn = false;
  }

  show(){
    this.loadSpinner = true;
  }

  hide(){
    this.loadSpinner = false;
  }

  getRole(){
    return this.role;
  }
  
}