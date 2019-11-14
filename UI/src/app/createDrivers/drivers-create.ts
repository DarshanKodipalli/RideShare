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
  private driverData :any = [];
  constructor( private http:RestService,  private rout: Router, private spinnerService:Ng4LoadingSpinnerService) {
      this.driverData.name = "Theiry Henry";
      this.driverData.number = "(312)-901-1723";
      this.driverData.email = "Theiry.Henry@gmail.com";
      this.driverData.vehicleName = "(312)-901-1723";
      this.driverData.vehicleNumber = "BHR 19827";
      this.driverData.liscenceNumber = "12897kjdasi";

   }

  ngOnInit() {
  }
  addDriver(driverData){
    Swal({
      title: 'Create new Driver: '+driverData.name+'?',
      text: 'This\'ll Create a New Driver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
        Swal(
          'Driver Created',
          'success'
        ).then((newResult)=>{
          this.rout.navigate(['/dashboard']);
        })
      },(error)=>{
        console.log(error);
      })    
  }
}
