import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private role:any = "";
  constructor(private rout:Router) { }

  ngOnInit() {
    var loginData = JSON.parse(localStorage.getItem("login"));
    this.role = loginData.role;    
  }

  showUsers(user){
    if(user === 'buyer'){
      this.rout.navigate(['/users']);
    }else{
      this.rout.navigate(['/sellers']);
    }
  }
}
