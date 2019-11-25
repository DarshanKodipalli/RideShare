import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js';
import { AppComponent } from '../app.component';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart = [];
  show:boolean = true;
  public customerName:any = JSON.parse(localStorage.getItem("login")).username;
  public pickUpZipLabels:any = [];
  public pickUpZipCount:any = [];

  public dropZipLabels:any = [];
  public dropZipCount:any = [];

  public rideTypeLabels:any = [];
  public rideTypeCount:any = [];

  public bookedOnCount:any = [];
  public bookedOnLabel:any = [];

  public cancelledOnCount:any = [];
  public cancelledOnLabel:any = [];

  public ridesWithDriverCount:any = [];
  public driverLabels:any = [];

  constructor(private _service: WeatherService, private app: AppComponent, private http: RestService) { 
    this.http.getDataForDashboard({username:this.customerName}).subscribe(
      (response)=>{
        console.log(response.json());
        var dataList1 = response.json().pickUpList;
        var keyArray= [];
        var valueArray = [];
        dataList1.map(function(dataSet){
          keyArray.push(dataSet.pickupzipcode);
          valueArray.push(dataSet.pickUpsFrom);
        })
        this.pickUpZipLabels = keyArray;
        this.pickUpZipCount = valueArray;        

        var dataList2 = response.json().dropList;
        var keyArray1= [];
        var valueArray1 = [];
        dataList2.map(function(dataSet){
          keyArray1.push(dataSet.dropsTo);
          valueArray1.push(dataSet.dropzipcode);
        })
        this.dropZipLabels = keyArray1;
        this.dropZipCount = valueArray1;        

        var dataList3 = response.json().rideTypeList;
        var keyArray2= [];
        var valueArray2 = [];
        dataList3.map(function(dataSet){
          keyArray2.push(dataSet.ride_type);
          valueArray2.push(dataSet.rideTypeCount);
        })
        this.rideTypeLabels = keyArray2;
        this.rideTypeCount = valueArray2;        

        var dataList4 = response.json().bookedOnList;
        var keyArray3= [];
        var valueArray3 = [];
        dataList4.map(function(dataSet){
          keyArray3.push(dataSet.booked_on_date);
          valueArray3.push(dataSet.bookedOnCount);
        })
        this.bookedOnLabel = keyArray3;
        this.bookedOnCount = valueArray3;        

        var dataList5 = response.json().cancelledOnList;
        var keyArray4= [];
        var valueArray4 = [];
        dataList5.map(function(dataSet){
          keyArray4.push(dataSet.cancelled_on_date);
          valueArray4.push(dataSet.cancelledOn);
        })
        this.cancelledOnLabel = keyArray4;
        this.cancelledOnCount = valueArray4;        

        var dataList6 = response.json().ridesWithDrivers;
        var keyArray5= [];
        var valueArray5 = [];
        dataList6.map(function(dataSet){
          keyArray5.push(dataSet.rideCount);
          valueArray5.push(dataSet.driver);
        })
        this.ridesWithDriverCount = keyArray5;
        this.driverLabels = valueArray5;        

      },(error)=>{
        console.log(error);
      }
    )
  }
  
  ngAfterViewInit(){
    
  }

  ngOnInit() {

    setTimeout(() => {
      this.app.setLoggedIn();
      this.app.show();
    } , 0);
    this.show = true;
    this._service.dailyForecast()
      .subscribe(res => {
        
        //console.log(res);
        /*
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        */
        let temp_max = ['100','200','300','400','500','600','700','800'];
        let temp_min = ['10','20','30','40','50','60','70','80'];
        //let alldates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let alldates = [];
        let weatherDates = []
        alldates.forEach((res) => {
            var jsdate = new Date();
            weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });

        this.chart = new Chart('canvas', {
          type: 'polarArea',
          data: {
            datasets: [{
                data: this.bookedOnCount,                  
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.bookedOnLabel
        },
          options: {
          }
        });          

        this.chart = new Chart('canvas1', {
          type: 'polarArea',
          data: {
            datasets: [{
                data: this.cancelledOnCount,                  
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941'],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.cancelledOnLabel
        },
          options: {
          }
        });          

        this.chart = new Chart('canvas2', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.rideTypeLabels,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
            labels: this.rideTypeCount
        },
          options: {
          }
        });

        this.chart = new Chart('canvas3', {
          type: 'bar',
          data: {
              labels: this.pickUpZipLabels,
              datasets: [{
                  label: '# of Pickups from these Areas',
                  data: this.pickUpZipCount,
                  backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941'],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }        
        });


        this.chart = new Chart('canvas4', {
          type: 'bar',
          data: {
              labels: this.dropZipCount,
              datasets: [{
                  label: '# of Drops from these Areas',
                  data: this.dropZipLabels,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }        
        });



        this.chart = new Chart('canvas5', {
          type: 'pie',
          data: {
            datasets: [{
                data: this.ridesWithDriverCount,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
            labels: this.driverLabels
        },
          options: {
          }
        });
      this.show = false;
      },(error)=>{
        console.log(error);
      });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.app.hide();
    } , 0);
  }

}
