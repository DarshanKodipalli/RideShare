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
  // lat = 41.834570;
  // lng = -87.631800;
  public lat: any;
  public lng : any;
  public latitude : any;
  public longitude: any;
  public origin: any;
  public destination: any;
  public sourceLat;
  public sourceLong;
  public destLat;
  public destLong;
  public progressBar:boolean;
  public loadGridSpinner:boolean = true;
  public findNotExecYet:boolean = false;

  private fileUrl:string
  private role:String;
  private createInvoice:any = {};
  private searchParams:any = {};
  private geoCoder;
  private isTracking:boolean = false;

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
  

  constructor(private http: RestService, private route: Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 
    // if (navigator)
    // {
    // navigator.geolocation.getCurrentPosition( pos => {
    //     this.lng = +pos.coords.longitude;
    //     this.lat = +pos.coords.latitude;
    //   });
    // }
   }

  ngOnInit() {
    var data = [
      {
        "source" : "Michigan Ave, Chicago, IL",
        "destination" : "Burlington, 1 N State St, Chicago, IL",
        "distance" : "6.2 miles",
        "booked_on" : "10-29-2019 10:43",
        "totalBookingCost" : "$ 13.27",
        "driver" : "Tim Howard"
      },
      {
        "source" : "2951 South King Drive Chicago, IL",
        "destination" : "3434 South Michigan Avenue Chicago, IL",
        "distance" : "1.2 miles",
        "booked_on" : "10-24-2019 16:22",
        "totalBookingCost" : "$ 7.63",
        "driver" : "John Doe"
      },
      {
        "source" : "122 South Michigan Avenue Chicago, IL",
        "destination" : "Devon Market West Devon Avenue, Chicago, IL",
        "distance" : "13.2 miles",
        "booked_on" : "10-31-2019 08:35",
        "totalBookingCost" : "$ 36.47",
        "driver" : "Christopher Nicolas"
      },
      {
        "source" : "Lake Meadows East 33rd Street, Chicago, IL",
        "destination" : "Burlington, 1 N State St, Chicago, IL",
        "distance" : "0.2 miles",
        "booked_on" : "10-30-2019 12:43",
        "totalBookingCost" : "$ 3.78",
        "driver" : "Steve Henry"
      },
      {
        "source" : "Accounting And Tax Services, Inc East Boughton Road, Bolingbrook, IL",
        "destination" : "2231 Michigan Avenue Chicago, Illinois",
        "distance" : "27.2 miles",
        "booked_on" : "10-26-2019 14:43",
        "totalBookingCost" : "$ 75.21",
        "driver" : "Abdul Razak"
      },
      {
        "source" : "Roosevelt University South Michigan Avenue, Chicago, IL",
        "destination" : "Unibody Auto Collision North Milwaukee Avenue, Chicago, IL",
        "distance" : "5.4 miles",
        "booked_on" : "10-8-2019 10:43",
        "totalBookingCost" : "$ 9.22",
        "driver" : "Tim Howard"
      },
      {
        "source" : "Target North Elston Avenue, Chicago, IL",
        "destination" : "Kingston Mines North Halsted Street, Chicago, IL",
        "distance" : "2.4 miles",
        "booked_on" : "10-12-2019 18:34",
        "totalBookingCost" : "$ 8.31",
        "driver" : "John Doe"
      },
      {
        "source" : "UIC Student Center East South Halsted Street, Chicago, IL",
        "destination" : "Devon Market West Devon Avenue, Chicago, IL",
        "distance" : "12.2 miles",
        "booked_on" : "10-30-2019 08:35",
        "totalBookingCost" : "$ 36.47",
        "driver" : "Christopher Nicolas"
      },
      {
        "source" : "Lemar Avenue Evanston, IL",
        "destination" : "Stuart-Rodgers Photography Green Bay Road, Evanston, IL",
        "distance" : "1.5 miles",
        "booked_on" : "10-30-2019 12:43",
        "totalBookingCost" : "$ 4.88",
        "driver" : "Steve Henry"
      }];
      this.zoom = 15;
      // let map = new google.maps.Map(document.getElementById('map'))
      // var trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(map);

      this.dataSource = new MatTableDataSource<Rides>(data);  
      this.load(); 
  }
  load(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      // console.log('gencoder ', this.geoCoder)

      let autocompleteSource = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode']
      });
      autocompleteSource.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteSource.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          this.location1 = place.geometry.location;
          // this.zoom = 12;
        });
      });
      let autocompleteDestination = new google.maps.places.Autocomplete(this.searchDestElementRef.nativeElement, {
        types: ['geocode']
      });
      autocompleteDestination.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteDestination.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          this.location2 = place.geometry.location;
          // this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
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
  findCabs(){
    this.origin = {};
    this.destination = {};
    console.log(this.location1, this.location2)
    this.origin = this.location1;
    this.destination = this.location2;
    // this.progressBar = false;
    // this.findNotExecYet = true;
    this.zoom = 18;
    setTimeout(() => {
      this.progressBar=true;
    }, 5000);    
  }
  confirmBooking(){
    Swal({
      title: 'Confirm Booking?',
      text: 'This\'ll Confirm your booking!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
        Swal(
          'Booking Confirmed',
          'Christopher Nicolas will pick you up in 7 Minutes',
          'success'
        ).then((newResult)=>{
          this.route.navigate(['/allRides']);
        })
      },(error)=>{
        console.log(error);
      })
  }
}