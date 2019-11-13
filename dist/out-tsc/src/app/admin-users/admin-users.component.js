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
import { RestService } from '../services/rest.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
var ELEMENT_DATA = [];
var AdminUsersComponent = /** @class */ (function () {
    function AdminUsersComponent(rout, http) {
        this.rout = rout;
        this.http = http;
        this.displayedColumns = ['select', 'username', 'firstName', 'lastName', 'email', 'companyName', 'maxlimit', 'statusMessage', 'actions'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.usersList = [];
        this.sellerList = [];
        this.options = [];
    }
    AdminUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getAllUsers().subscribe(function (response) {
            console.log("Users List:");
            _this.usersList = response.json().data;
            console.log(_this.usersList);
            for (var i = 0; i < _this.usersList.length; i++) {
                if (_this.usersList[i].firstName) {
                    _this.usersList[i].statusMessage = "Profile is Updated";
                    _this.usersList[i].statusColor = true;
                }
                else {
                    _this.usersList[i].firstName = "N/A";
                    _this.usersList[i].lastName = "N/A";
                    _this.usersList[i].companyName = "N/A";
                    _this.usersList[i].statusMessage = "Profile is not Updated";
                    _this.usersList[i].statusColor = false;
                }
                if (_this.usersList[i].maxlimit === 0) {
                    _this.usersList[i].maxlimit = "Credit not set";
                }
                if ((_this.usersList[i].role === "sellerchecker") || (_this.usersList[i].role === "seller")) {
                    if (_this.usersList[i].role === "seller") {
                        _this.usersList[i].sellerRole = "Maker";
                    }
                    else {
                        _this.usersList[i].sellerRole = "Checker";
                        _this.options.push(_this.usersList[i].email);
                    }
                    _this.sellerList.push(_this.usersList[i]);
                    _this.BuyerCount += 1;
                }
            }
            _this.dataSource = new MatTableDataSource(_this.sellerList);
            console.log(_this.usersList);
        }, function (error) {
            console.log(error);
        });
    };
    AdminUsersComponent.prototype.setCreditLimit = function (userData) {
        userData.options = this.options;
        localStorage.setItem("userCreditData", JSON.stringify(userData));
        this.rout.navigate(['setCreditLimit']);
    };
    AdminUsersComponent.prototype.createSeller = function () {
        this.rout.navigate(['/createseller']);
    };
    AdminUsersComponent = __decorate([
        Component({
            selector: 'app-admin-users',
            templateUrl: './admin-users.component.html',
            styleUrls: ['./admin-users.component.scss']
        }),
        __metadata("design:paramtypes", [Router, RestService])
    ], AdminUsersComponent);
    return AdminUsersComponent;
}());
export { AdminUsersComponent };
//# sourceMappingURL=admin-users.component.js.map