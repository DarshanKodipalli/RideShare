import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private role:string;
  private city:string;
  private state:string;
  private user:String = "";
  private actualDate:String = "";
  private userName:String = JSON.parse(localStorage.getItem("login")).username;
  constructor(private route: Router) { 
    var todaysDate = new Date();
    var todayFormat = formatDate(todaysDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    console.log(todayFormat);
    var date:any = todayFormat.split(" ");
    console.log(date);
    console.log(date[0].split("-"));
    var splitDate = date[0].split("-");
    var day = splitDate[0];
    var monthNumber = splitDate[1];
    var montha:String = "";
    if(monthNumber.toString().length === 1){
      montha = "0"+monthNumber;
    }else{
      montha = monthNumber.toString();
    }
    console.log(montha);
    console.log(monthNumber);
    var monthText = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var month;
    switch (montha.toString()) {
      case "01": month = monthText[0] ; break
      case "02": month = monthText[1] ; break
      case "03": month = monthText[2] ; break
      case "04": month = monthText[3] ; break
      case "05": month = monthText[4] ; break
      case "06": month = monthText[5] ; break
      case "07": month = monthText[6] ; break
      case "08": month = monthText[7] ; break
      case "09": month = monthText[8] ; break
      case "10": month = monthText[9] ; break
      case "11": month = monthText[10] ; break
      default: month = monthText[11] ; break
    }
         this.actualDate = day+"-"+month+"-"+splitDate[2];
         console.log(this.actualDate);
  }
  ngOnInit() {
    var loginData = JSON.parse(localStorage.getItem("login"));
    console.log(loginData);
    this.role = loginData.role;
    this.user = loginData.userName;
    this.city = loginData.city;
    this.state = loginData.state;
    console.log("Header role is "+this.role);
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
  changePassword(){
    console.log("UpdatePassword");
    this.route.navigate(['passwordUpdate']);    
  }
  changeProfile(){
    console.log("profileUpdate")
    this.route.navigate(['profileUpdate']);
  }
}
