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
  booked_on: string;
  totalBookingCost: string;
  driver: string;
}

const ELEMENT_DATA: Rides[] = [
];

@Component({
  selector: 'app-allRides',
  templateUrl: './allRides.component.html',
  styleUrls: ['./allRides.component.scss']
})
export class AllRidesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'source', 'destination', 'distance', 'booked_on', 'totalBookingCost', 'driver'];
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

      this.dataSource = new MatTableDataSource<Rides>(data);      
  }

}
