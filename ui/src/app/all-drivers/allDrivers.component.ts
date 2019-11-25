import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

export interface Drivers {
  username: string;
  email: string;
  phone: string;
  car: string;
  license: string;
  rating: string;
}

const ELEMENT_DATA: Drivers[] = [
];

@Component({
  selector: 'app-allDrivers',
  templateUrl: './allDrivers.component.html',
  styleUrls: ['./allDrivers.component.scss']
})
export class AllDriversComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'phone', 'car', 'license', 'rating'];
  dataSource:any = new MatTableDataSource<Drivers>(ELEMENT_DATA);
  selection = new SelectionModel<Drivers>(true, []);

  
  @Input() changing: Subject<boolean>;

  loadGridSpinner:boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: RestService, private route: Router) { }
  private fileUrl:string
  private role:String;
  private createInvoice:any = {};
  private searchParams:any = {};
  private allDriversList:any = [];
  ngOnInit() {

      this.http.getDriversInformation().subscribe(
        (response)=>{
          console.log(response.json())
          this.allDriversList = response.json();
          this.dataSource = new MatTableDataSource<Drivers>(this.allDriversList);      
        },(error)=>{
          console.log(error);
        })
  }

}
