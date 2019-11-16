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
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(route) {
        this.route = route;
        this.user = "";
        this.actualDate = "";
        var todaysDate = new Date();
        var todayFormat = formatDate(todaysDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
        console.log(todayFormat);
        var date = todayFormat.split(" ");
        console.log(date);
        console.log(date[0].split("-"));
        var splitDate = date[0].split("-");
        var day = splitDate[0];
        var monthNumber = splitDate[1];
        var montha = "";
        if (monthNumber.toString().length === 1) {
            montha = "0" + monthNumber;
        }
        else {
            montha = monthNumber.toString();
        }
        console.log(montha);
        console.log(monthNumber);
        var monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month;
        switch (montha.toString()) {
            case "01":
                month = monthText[0];
                break;
            case "02":
                month = monthText[1];
                break;
            case "03":
                month = monthText[2];
                break;
            case "04":
                month = monthText[3];
                break;
            case "05":
                month = monthText[4];
                break;
            case "06":
                month = monthText[5];
                break;
            case "07":
                month = monthText[6];
                break;
            case "08":
                month = monthText[7];
                break;
            case "09":
                month = monthText[8];
                break;
            case "10":
                month = monthText[9];
                break;
            case "11":
                month = monthText[10];
                break;
            default:
                month = monthText[11];
                break;
        }
        this.actualDate = day + "-" + month + "-" + splitDate[2];
        console.log(this.actualDate);
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        this.user = loginData.username;
        console.log("Header role is " + this.role);
    };
    HeaderComponent.prototype.logout = function () {
        localStorage.clear();
        this.route.navigate(['login']);
    };
    HeaderComponent.prototype.changePassword = function () {
        console.log("UpdatePassword");
        this.route.navigate(['passwordUpdate']);
    };
    HeaderComponent.prototype.changeProfile = function () {
        console.log("profileUpdate");
        this.route.navigate(['profileUpdate']);
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map