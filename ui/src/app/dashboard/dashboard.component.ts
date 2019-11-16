import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js.js';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart = [];
  show:boolean = true;

  constructor(private _service: WeatherService, private app: AppComponent) { }
  
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
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        this.chart = new Chart('canvas1', {
          type: 'bar',
          data: {
            labels: ["Jan","Jun","Dec"],
            datasets: [{
              label: "Payments",
              data: [28, 64, 56],
              backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
          }]
          }
        });
        this.chart = new Chart('canvas2', {
          type: 'pie',
          data: {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '2 Stars',
                '3 Stars',
                '4 Stars'
            ]
        },
          options: {
          }
        });
        this.chart = new Chart('canvas3', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: [30, 70],
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Source',
                'Destination'
            ]
        },
          options: {
          }
        });
        this.chart = new Chart('canvas4', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: [30, 50, 10, 100],
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Tim',
                'Steve',
                'John',
                'Abdul'
            ]
        },
          options: {
          }
        });
        this.chart = new Chart('canvas5', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
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
