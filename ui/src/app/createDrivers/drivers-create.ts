import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { RestService } from '../services/rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];
@Component({
  selector: 'app-drivers-new',
  templateUrl: './drivers-create.html',
  styleUrls: ['./drivers-create.scss']
})
export class CreateDriversComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private driverData :any = {};
  constructor( private http:RestService,  private rout: Router, private spinnerService:Ng4LoadingSpinnerService) {
      this.driverData.username = "Daniel James";
      this.driverData.phone = "(312)-121-2454";
      this.driverData.email = "d.james@gmail.com";
      this.driverData.car = "Lexus RX RX 350 F Sport";
      this.driverData.vehicleNumber = "JUA 120394";
      this.driverData.license = "MKSJ0942340NJS";
      this.driverData.password = "password"
      this.driverData.rating = 4.6;
      this.driverData.usertype = "driver";
      this.driverData.carImage = "https://9e59a6be9d5449310956-e1f1a2f001d94011e35e09c0b10e271b.ssl.cf1.rackcdn.com/2T2BZMCA5KC179893/1a2cbebacb4f74ec8b5279e12360961f.jpg";
   }

  ngOnInit() {
  }
  addDriver(driverData){
    Swal({
      title: 'Create new Driver: '+driverData.username+' ?',
      text: 'This\'ll Create a New Driver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      this.http.registerDriver(this.driverData).subscribe(
        (response)=>{
          console.log(response.json());
          Swal(
            'Driver Created',
            'success'
          ).then((newResult)=>{
            this.rout.navigate(['/viewDrivers']);
          })
        },(error)=>{
          console.log("error");
        })
      },(error)=>{
        console.log(error);
      })    
  }
}
