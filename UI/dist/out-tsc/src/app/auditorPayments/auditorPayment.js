var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { RestService } from '../services/rest.service';
var ELEMENT_DATA = [];
var AuditorPaymentComponent = /** @class */ (function () {
    function AuditorPaymentComponent(service) {
        this.service = service;
        this.displayedColumns = ['select', 'orderNumber', 'amount', 'utrNumber', 'sellerId', 'bankerId', 'createdDate', 'status'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
    }
    AuditorPaymentComponent.prototype.ngOnInit = function () {
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        // loadData
        this.getOrders();
        /*    this.changing.subscribe(v=>{
              console.log("tab changed"+v);
              // refresh grid on tab change
              this.reloadGrid();
            });*/
    };
    AuditorPaymentComponent.prototype.getOrders = function () {
        var _this = this;
        this.service.getPayments().subscribe(function (res) {
            console.log(res.json());
            var orders = res.json().data;
            for (var i = 0; i < orders.length; i++) {
                var createdDate = orders[i].created.split('T')[0];
                var bankerId = orders[i].banker.split('#')[1];
                orders[i].buyerId = "buyer1@aeries.io";
                orders[i].bankerId = bankerId;
                orders[i].createdDate = createdDate;
                orders[i].status = orders[i].statusMessage;
                orders[i].disabled = false;
                if (orders[i].statusCode === 3) {
                    orders[i].disabled = true;
                }
            }
            _this.dataSource = new MatTableDataSource(orders);
            _this.dataSource.sort = _this.sort;
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(orders);
        }, function (error) {
            console.log(error);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    AuditorPaymentComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    AuditorPaymentComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    AuditorPaymentComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
    };
    AuditorPaymentComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    AuditorPaymentComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    AuditorPaymentComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getOrders(); // send filter parameters along
    };
    AuditorPaymentComponent.prototype.addNewOrderTab = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], AuditorPaymentComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], AuditorPaymentComponent.prototype, "sort", void 0);
    AuditorPaymentComponent = __decorate([
        Component({
            selector: 'app-auditorpayment',
            templateUrl: './auditorPayment.html',
            styleUrls: ['./auditorPayment.scss']
        }),
        __metadata("design:paramtypes", [RestService])
    ], AuditorPaymentComponent);
    return AuditorPaymentComponent;
}());
export { AuditorPaymentComponent };
//# sourceMappingURL=auditorPayment.js.map