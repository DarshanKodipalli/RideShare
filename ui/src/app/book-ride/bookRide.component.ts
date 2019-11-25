import { Component, OnInit, ViewChild, Input,  ElementRef, NgZone} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {} from '@types/googlemaps';
// import {} from 'googlemaps';
declare var google: any;

export interface Rides {
  source: string;
  destination: string;
}

const ELEMENT_DATA: Rides[] = [
];

@Component({
  selector: 'app-bookRide',
  templateUrl: './bookRide.component.html',
  styleUrls: ['./bookRide.component.scss']
})
export class BookRideComponent implements OnInit {


  public displayedColumns: string[] = ['select', 'source', 'destination'];
  public dataSource:any = new MatTableDataSource<Rides>(ELEMENT_DATA);
  public selection = new SelectionModel<Rides>(true, []);
  public lat: any;
  public lng : any;
  public latitude : any;
  public longitude: any;
  public location:any = {};
  public latitude2 : any;
  public longitude2: any;
  public latitude3 : any;
  public longitude3: any;
  public latitude4 : any;
  public longitude4: any;
  public latitude5 : any;
  public longitude5: any;
  public driverMarker:boolean = true;
  public origin: any;
  public destination: any;
  public sourceLat;
  public sourceLong;
  public destLat;
  public destLong;
  public progressBar:boolean;
  public loadGridSpinner:boolean = true;
  public findNotExecYet:boolean = false;
  public source:any = "";
  public destination1:any = "";
  public customerName:any = JSON.parse(localStorage.getItem("login")).username;
  public fileUrl:string
  public role:String;
  public createInvoice:any = {};
  public searchParams:any = {};
  public geoCoder;
  public isTracking:boolean = false;
  public pickUpZip:String = "";
  public dropZip:String = "";
  public dataObj:any = {};
  public radioType:any;
  public numberOfPeople:boolean = true;
  public numberOfPeopleCount:number = 1;
  public driversList:any = [];
  public randomNumber:number;
  public selectedDriver:any = {};
  public pickUpTime:number;
  public eta:number = 0.0;
  public distance = 0.0; 
  public etaDisplay:String = "";
  public distanceDisplay:String = "";
  public fareEstimationObject:any = {};
  public totalRideFare:number = 0.0;
  zoom: number; 
  address: string;
  location1: any;
  location2: any;
  place: any;

  @Input() changing: Subject<boolean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('searchs')
  public searchDestElementRef: ElementRef;
  @ViewChild('maps')
  public mapsElementRef: ElementRef;
  

  constructor(public http: RestService, public route: Router,public mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone) { 
    this.location.icon = "./taxi.icon";
    this.dataObj.username = this.customerName;
      this.http.getDriversInformation().subscribe(
        (response)=>{
          this.driversList = response.json();
          console.log(this.driversList);
          this.randomNumber = Math.floor(Math.random() * (this.driversList.length+1));
          console.log(this.randomNumber);
          this.selectedDriver = this.driversList[this.randomNumber - 1];          
          this.selectedDriver.passengerCount =  Math.floor(Math.random() * 2);
          this.pickUpTime = this.randomNumber * 3;
          this.fareEstimationObject.trips_pooled = this.selectedDriver.passengerCount + this.numberOfPeopleCount;
        },(error)=>{
          console.log(error);
        }
      );
      this.zoom = 15;
      // let map = new google.maps.Map(document.getElementById('map'))
      // var trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(map);
      this.load(); 
      this.latitude2 = 41.838440
      this.longitude2 = -87.617100

      this.latitude3 = 41.842180
      this.longitude3 = -87.627560

      this.latitude4 = 41.841290
      this.longitude4 = -87.623710

      this.latitude5 = 41.842040
      this.longitude5 = -87.619510


   }

  ngOnInit() {
  }
  load(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocompleteSource = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode']
      });
      autocompleteSource.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteSource.getPlace(); 
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.location1 = place.geometry.location;
          console.log("place1");
          console.log(place);
          this.source = place.formatted_address;
          this.dataObj.source =this.source;
          this.pickUpZip = place.address_components[place.address_components.length - 1].long_name;
          console.log(this.pickUpZip);
          if(this.pickUpZip){
            this.dataObj.pickUpzipcode = this.pickUpZip;
          }else{
            this.dataObj.pickUpzipcode = 60616;
          }
        });
      });
      let autocompleteDestination = new google.maps.places.Autocomplete(this.searchDestElementRef.nativeElement, {
        types: ['geocode']
      });
      autocompleteDestination.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteDestination.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.location2 = place.geometry.location;
          console.log("place2");
          console.log(place);
          this.destination1 = place.formatted_address;
          this.getDistancia(this.source, this.destination1);
          this.dataObj.destination = this.destination1;
          this.dropZip = place.address_components[place.address_components.length - 1].long_name;          
          console.log(this.dropZip);
          if(this.dropZip){
            this.dataObj.dropzipcode = this.dropZip;
          }else{
            this.dataObj.dropzipcode = 60616;
          }
        });
      });
    });
  }

  public getDistancia(origen: string, destino: string) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode: 'DRIVING'}, (results: any) => {
        this.distance = 0.000621371 * results.rows[0].elements[0].distance.value;
        this.distance = Math.round(this.distance*100)/100;
        this.dataObj.distance = this.distance;
        this.eta = results.rows[0].elements[0].duration.value;
        this.dataObj.duration = results.rows[0].elements[0].duration.value;    
        this.eta = this.eta / 60;
        this.eta = Math.round(this.eta*100)/100;
        this.etaDisplay = this.eta + " Minutes";
        this.distanceDisplay = this.distance + " Miles";
        this.fareEstimationObject.duration = results.rows[0].elements[0].duration.value;
        this.fareEstimationObject.distance = this.distance;
        console.log('result distance (mts) -- ', this.distance);
        console.log('result Duration (seconds) -- ', this.eta);
    });
  }

  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
    let map = new google.maps.TrafficLayer(this.mapsElementRef.nativeElement,{center: {lat: this.latitude, lng: this.longitude}});
      var trafficLayer = new google.maps.TrafficLayer()
      trafficLayer.setMap(map);
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  
  markerClicked(lat,lng) {
    // console.log('clicked');
    this.place = {lat:lat,lng: lng};
    console.log(this.place);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    }); 
  }
  trackMe(){
      for(var i=0;i<20;i++){
          console.log("trackMeCalled")
          if (navigator.geolocation) {
            this.isTracking = true;
            navigator.geolocation.watchPosition((position) => {
              console.log(position);
              this.markerClicked(position.coords.latitude, position.coords.longitude);
            });
          } else {
            alert("Geolocation is not supported by this browser.");
          }    
      }
  }  
  rideType(type){
    if(type === "shared"){
      this.numberOfPeople = false;
      this.fareEstimationObject.is_pooled = true;
    }else{
      this.fareEstimationObject.is_pooled = false;
      this.fareEstimationObject.trips_pooled = 1;      
      this.numberOfPeople = true;
    }
  }
  countEntered(){
    this.fareEstimationObject.trips_pooled = this.selectedDriver.passengerCount + this.numberOfPeopleCount;
  }
  findCabs(){
    this.http.getEstimatedPrice(this.fareEstimationObject).subscribe(
      (response)=>{
        console.log(response.json());
        this.totalRideFare = response.json().fare;
        this.totalRideFare = Math.round(this.totalRideFare*100)/100;
      },(error)=>{
        console.log(error);
      })
    this.driverMarker = false;
    this.origin = {};
    this.destination = {};
    console.log(this.location1, this.location2)
    this.origin = this.location1;
    this.destination = this.location2;
    console.log(this.origin);
    console.log(this.destination);
    this.zoom = 18;
    setTimeout(() => {
      this.findNotExecYet = true;
    }, 8000);    
  }
  changeDriver(){
    Swal({
      title: 'Confirm Change the Driver? ',
      text: 'This\'ll change your current driver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      this.randomNumber = Math.floor(Math.random() * this.driversList.length);
      console.log(this.randomNumber);
      this.selectedDriver = this.driversList[this.randomNumber - 1];
      this.selectedDriver.passengerCount =  Math.floor(Math.random() * 2);
      this.fareEstimationObject.trips_pooled = this.selectedDriver.passengerCount + this.numberOfPeopleCount;
      this.pickUpTime = this.randomNumber * 3;      
    this.http.getEstimatedPrice(this.fareEstimationObject).subscribe(
      (response)=>{
        console.log(response.json());
        this.totalRideFare = response.json().fare;
        this.totalRideFare = Math.round(this.totalRideFare*100)/100;
        Swal(
          'We have found a new driver for you',
          this.selectedDriver.driverName+' will be your new Driver',
          'success'
        ).then((newResult)=>{
        })
        },(error)=>{
          console.log(error);
        })
      },(error)=>{
        console.log(error);
      })      
  }
  confirmBooking(){
    Swal({
      title: 'Confirm Booking with '+this.selectedDriver.driverName,
      text: 'This\'ll Confirm your booking!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
        this.dataObj.rideType = this.radioType;
        this.dataObj.driver = this.selectedDriver.driverName;
        this.dataObj.price = this.totalRideFare;
        console.log(this.dataObj);
        this.http.bookACab(this.dataObj).subscribe(
          (response)=>{
            console.log(response.json());
            Swal(
              'Booking Confirmed',
              this.selectedDriver.driverName+' will pick you up in ' +this.pickUpTime+ ' Minutes',
              'success'
            ).then((newResult)=>{
              this.route.navigate(['/allRides']);
            })
          },(error)=>{
            console.log(error);
          })
      },(error)=>{
        console.log(error);
      })
  }
}