import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

export interface Rides {
  source: string;
  destination: string;
  distance: string;
  booked_on_date: string;
  totalBookingCost: string;
  driver: string;
  status:string;
}

const ELEMENT_DATA: Rides[] = [
];

@Component({
  selector: 'app-allRides',
  templateUrl: './allRides.component.html',
  styleUrls: ['./allRides.component.scss']
})
export class AllRidesComponent implements OnInit {

  public selectedRecord:any = {};
  public rideCancellationReason:String = "";
  public customerName:any = JSON.parse(localStorage.getItem("login")).username;
  public userRole:any = JSON.parse(localStorage.getItem("login")).role;
  displayedColumns: string[] = ['source', 'destination', 'distance', 'booked_on_date', 'totalBookingCost', 'status' , 'driver', 'rating'];
  dataSource:any = new MatTableDataSource<Rides>(ELEMENT_DATA);
  selection = new SelectionModel<Rides>(true, []);

  
  @Input() changing: Subject<boolean>;

  loadGridSpinner:boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: RestService, private route: Router) { }
  private fileUrl:string
  private role:String;
  private createInvoice:any = {};
  private searchParams:any = {};
  private rideShow:boolean = false;
  private allRidesList:any = [];
  private cancelledRidesList:any = [];
  private cancelRideBool:boolean = false;
  private ratingValue:number = 0;
  public driverName:String = "";
  public rate_Whom:String = "Give Rating";
  ngOnInit() {
    if(JSON.parse(localStorage.getItem("login")).role ===  'admin'){
      console.log(this.userRole);
      this.http.getAllRidesForAdmin().subscribe(
        (response)=>{
          console.log(response.json())
          this.allRidesList = response.json();
          this.allRidesList.map(function(d) {
            if(JSON.parse(localStorage.getItem("login")).role === 'driver'){
              d.rating = d.driverRating;
            }else{
              d.rating = d.userRating;              
            }
            d.distance = Math.round(parseFloat(d.distance) * 100 ) / 100;
            d.price = Math.round(d.price*100)/100;
          })
          this.dataSource = new MatTableDataSource<Rides>(this.allRidesList);      
        },(error)=>{
          console.log(error);
        })
    }else{
      console.log(this.userRole);
      this.http.getAllRides({username:this.customerName,role:JSON.parse(localStorage.getItem("login")).role}).subscribe(
        (response)=>{
          console.log(response.json())
          this.allRidesList = response.json();
          this.allRidesList.map(function(d) {
            if(JSON.parse(localStorage.getItem("login")).role === 'driver'){
              if(d.driverRating){
                d.rating = d.driverRating;                
              }else{
                d.rating = "Not Rated yet!"
              }
            }else{
              d.rating = d.userRating;    
              if(d.userRating){
                d.rating = d.userRating;                
              }else{
                d.rating = "Not Rated yet!"
              }                        
            }
            d.distance = Math.round(parseFloat(d.distance) * 100 ) / 100;
            d.price = Math.round(d.price*100)/100;
          })
          this.dataSource = new MatTableDataSource<Rides>(this.allRidesList);      
        },(error)=>{
          console.log(error);
        })
    }
  }
  rideSearch(driverName){
    this.http.searchBasedOnDriver({driverName:driverName}).subscribe(
      (response)=>{
        console.log(response.json());
        var data = response.json();
          data.map(function(d) {
            if(JSON.parse(localStorage.getItem("login")).role === 'driver'){
              if(d.driverRating){
                d.rating = d.driverRating;                
              }else{
                d.rating = "Not Rated yet!"
              }
            }else{
              d.rating = d.userRating;    
              if(d.userRating){
                d.rating = d.userRating;                
              }else{
                d.rating = "Not Rated yet!"
              }                        
            }
            d.distance = Math.round(parseFloat(d.distance) * 100 ) / 100;
            d.price = Math.round(d.price*100)/100;
          })
          this.dataSource = new MatTableDataSource<Rides>(data);      
      },(error)=>{
        console.log(error);
      })
  }
  cancelledRides(){
    var cancelledData = [];
    this.allRidesList.map(function(ride){
      console.log(ride);
      if(ride.status === "Cancelled"){
        cancelledData.push(ride);
      }
    })    
    this.cancelledRidesList = cancelledData;
    this.dataSource = new MatTableDataSource<Rides>(this.cancelledRidesList);      
  } 
  allRides(){
    this.dataSource = new MatTableDataSource<Rides>(this.allRidesList);      
  } 
  action(type){
    if(type === "cancel"){
      this.cancelRideBool = false;
    }else{
      this.cancelRideBool = true;      
    }
  }
  cancelRide(rideDetail){
    console.log(rideDetail);
    this.selectedRecord = rideDetail;
    this.rideShow = true;
  }
  cancelRideFunction(){
    Swal({
      title: 'Cancel the Ride?',
      text: 'This\'ll Cancel the Ride!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'Dismiss'
    }).then((result) => {
      this.selectedRecord.cancel_reason = this.rideCancellationReason;
      this.http.cancelRide(this.selectedRecord).subscribe(
        (response)=>{
          Swal(
            'Ride Cancelled!',
            'Success'
          ).then((newResult)=>{
            if(JSON.parse(localStorage.getItem("login")).role === 'driver'){
             this.route.navigate(['/driverDashboard']);
            }else{              
             this.route.navigate(['/dashboard']);
            }
          })   
        },(error)=>{
          console.log(error);
        }
      )
    })    
  }     
  submitRating(){
    if(this.userRole === 'driver'){
      Swal({
        title: 'Submit Rating of '+this.ratingValue+' to '+this.selectedRecord.customer+' ?',
        text: 'This\'ll Submit the rating!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Rate',
        cancelButtonText: 'Dismiss'
      }).then((result) => {
        this.selectedRecord.rating = this.ratingValue;
        this.selectedRecord.role = this.userRole;
        this.http.UpdateUserRating(this.selectedRecord).subscribe(
          (response)=>{
            Swal(
              'Rating Saved!',
              'Success'
            ).then((newResult)=>{
              this.route.navigate(["/driverDashboard"])
            })   
          },(error)=>{
            console.log(error);
          }
        )
      })        
    }else{
      Swal({
        title: 'Submit Rating of '+this.ratingValue+' to '+this.selectedRecord.driver+' ?',
        text: 'This\'ll Submit the rating!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Rate',
        cancelButtonText: 'Dismiss'
      }).then((result) => {
        this.selectedRecord.rating = this.ratingValue;
        this.selectedRecord.role = this.userRole;
        this.http.UpdateUserRating(this.selectedRecord).subscribe(
          (response)=>{
            Swal(
              'Rating Saved!',
              'Success'
            ).then((newResult)=>{
              this.route.navigate(["/dashboard"])              
            })   
          },(error)=>{
            console.log(error);
          }
        )
      })        
    }
  }
}
