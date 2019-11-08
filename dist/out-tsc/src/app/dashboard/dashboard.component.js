var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js';
import { AppComponent } from '../app.component';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(_service, app) {
        this._service = _service;
        this.app = app;
        this.chart = [];
        this.show = true;
    }
    DashboardComponent.prototype.ngAfterViewInit = function () {
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.setLoggedIn();
            _this.app.show();
        }, 0);
        this.show = true;
        this._service.dailyForecast()
            .subscribe(function (res) {
            //console.log(res);
            /*
            let temp_max = res['list'].map(res => res.main.temp_max);
            let temp_min = res['list'].map(res => res.main.temp_min);
            let alldates = res['list'].map(res => res.dt)
            */
            var temp_max = ['100', '200', '300', '400', '500', '600', '700', '800'];
            var temp_min = ['10', '20', '30', '40', '50', '60', '70', '80'];
            //let alldates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var alldates = [];
            var weatherDates = [];
            alldates.forEach(function (res) {
                var jsdate = new Date();
                weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
            });
            _this.chart = new Chart('canvas', {
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
            _this.chart = new Chart('canvas1', {
                type: 'bar',
                data: {
                    labels: ["Jan", "Jun", "Dec"],
                    datasets: [{
                            label: "Marketing",
                            data: [10, 20, 30],
                            backgroundColor: ['#F79F79', '#F7D08A', '#E3F09B', '#87B6A7', '#5B5941']
                        }]
                }
            });
            _this.chart = new Chart('canvas2', {
                type: 'pie',
                data: {
                    datasets: [{
                            data: [10, 20, 30],
                            backgroundColor: ['#F79F79', '#F7D08A', '#E3F09B', '#87B6A7', '#5B5941']
                        }],
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Red',
                        'Yellow',
                        'Blue'
                    ]
                },
                options: {}
            });
            _this.chart = new Chart('canvas3', {
                type: 'doughnut',
                data: {
                    datasets: [{
                            data: [30, 70],
                            backgroundColor: ['#F79F79', '#F7D08A', '#E3F09B', '#87B6A7', '#5B5941']
                        }],
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Buyer',
                        'Seller'
                    ]
                },
                options: {}
            });
            _this.chart = new Chart('canvas4', {
                type: 'doughnut',
                data: {
                    datasets: [{
                            data: [30, 50, 10, 100],
                            backgroundColor: ['#F79F79', '#F7D08A', '#E3F09B', '#87B6A7', '#5B5941']
                        }],
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Submitted',
                        'Approved',
                        'Payments Completed',
                        'Yet to pay'
                    ]
                },
                options: {}
            });
            _this.chart = new Chart('canvas5', {
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
            _this.show = false;
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.hide();
        }, 0);
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [WeatherService, AppComponent])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map