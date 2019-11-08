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
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { AppComponent } from '../app.component';
var ELEMENT_DATA = [];
var AdminUsersPageComponent = /** @class */ (function () {
    function AdminUsersPageComponent(route, http, app, rout) {
        this.route = route;
        this.http = http;
        this.app = app;
        this.rout = rout;
        this.displayedColumns = ['select', 'username', 'firstName', 'lastName', 'email', 'companyName', 'maxlimit', 'statusMessage', 'actions'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.invoiceNumber = "";
        this.currentTab = "";
        this.currentIndex = 0;
        this.changingValue = new Subject();
        this.usersList = [];
        this.buyerList = [];
        this.tabs = ['User List'];
        this.selected = new FormControl(0);
    }
    AdminUsersPageComponent.prototype.ngOnInit = function () {
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
                if ((_this.usersList[i].role === "Buyer") || (_this.usersList[i].role === "buyer")) {
                    _this.buyerList.push(_this.usersList[i]);
                    _this.BuyerCount += 1;
                }
            }
            _this.dataSource = new MatTableDataSource(_this.buyerList);
            console.log(_this.usersList);
        }, function (error) {
            console.log(error);
        });
    };
    AdminUsersPageComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.hide();
        }, 0);
    };
    AdminUsersPageComponent.prototype.addTab = function (id, page) {
        this.invoiceNumber = id;
        //console.log(this.tabs.indexOf('Invoice Detail'));
        if (page == 'detail') {
            if (this.tabs.indexOf('Invoice Detail') == -1) {
                this.tabs.push('Invoice Detail');
            }
            this.currentTab = 'Invoice Detail';
        }
        else if (page == 'new') {
            if (this.tabs.indexOf('New Invoice') == -1) {
                this.tabs.push('New Invoice');
            }
            this.currentTab = 'New Invoice';
        }
        //console.log("current tab value is "+this.currentTab.valueOf());
        //console.log("Array index of"+this.tabs.indexOf(this.currentTab.valueOf()));
        this.selected.setValue(this.tabs.indexOf(this.currentTab.valueOf()));
    };
    AdminUsersPageComponent.prototype.setCreditLimit = function (userData) {
        localStorage.setItem("userCreditData", JSON.stringify(userData));
        this.rout.navigate(['setCreditLimit']);
    };
    AdminUsersPageComponent.prototype.removeTab = function () {
        console.log("Removing detail tab. pass index");
        this.tabs.splice(1, 1);
    };
    AdminUsersPageComponent.prototype.onLinkClick = function (event) {
        console.log('event => ', event);
        console.log('index => ', event.index);
        console.log('tab => ', event.tab);
        this.currentIndex = event.index;
        this.currentTab = event.tab.textLabel;
        if (event.index == 0) {
            this.changingValue.next(true);
            window.history.replaceState({}, '', "/invoice");
        }
        else if (this.invoiceNumber) {
            window.history.replaceState({}, '', "/invoice?invoiceNumber=" + this.invoiceNumber);
        }
        else {
            window.history.replaceState({}, '', "/createinvoice");
        }
    };
    AdminUsersPageComponent.prototype.getCurrentTab = function () {
        return this.currentTab;
    };
    AdminUsersPageComponent.prototype.getCurrentIndex = function () {
        return this.currentIndex;
    };
    AdminUsersPageComponent.prototype.createBuyer = function () {
        this.rout.navigate(['/createbuyer']);
    };
    AdminUsersPageComponent = __decorate([
        Component({
            selector: 'app-admin-users-page',
            templateUrl: './admin-users-page.component.html',
            styleUrls: ['./admin-users-page.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, RestService,
            AppComponent, Router])
    ], AdminUsersPageComponent);
    return AdminUsersPageComponent;
}());
export { AdminUsersPageComponent };
//# sourceMappingURL=admin-users-page.component.js.map