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
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
var ELEMENT_DATA = [];
var AuditorInvoiceComponent = /** @class */ (function () {
    function AuditorInvoiceComponent(http, route) {
        this.http = http;
        this.route = route;
        this.displayedColumns = ['select', 'invoiceNumber', 'orderNumber', 'amount', 'sellerId', 'bankerId', 'createdDate', 'status'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
        this.createInvoice = {};
    }
    AuditorInvoiceComponent.prototype.ngOnInit = function () {
        // loadData
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        this.getInvoices();
        /*    this.changing.subscribe(v=>{
              console.log("tab changed"+v);
              // refresh grid on tab change
              this.reloadGrid();
            });*/
    };
    AuditorInvoiceComponent.prototype.getInvoices = function () {
        var _this = this;
        this.http.getToBeApprovedInvoices()
            .subscribe(function (res) {
            console.log(res.json());
            var invoices = res.json().invoices;
            for (var i = 0; i < invoices.length; i++) {
                var createdDate = invoices[i].created.split('T')[0];
                var sellerId = invoices[i].seller.split('#')[1];
                var bankerId = invoices[i].banker.split('#')[1];
                var buyerId = invoices[i].buyer.split('#')[1];
                invoices[i].sellerId = sellerId;
                invoices[i].buyerId = buyerId;
                invoices[i].bankerId = bankerId;
                invoices[i].createdDate = createdDate;
                invoices[i].status = invoices[i].statusMessage;
                invoices[i].disabled = false;
                if (invoices[i].statusCode === 3) {
                    invoices[i].disabled = true;
                }
            }
            _this.dataSource = new MatTableDataSource(invoices);
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(invoices);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    AuditorInvoiceComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    AuditorInvoiceComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    AuditorInvoiceComponent.prototype.timeline = function (data) {
        localStorage.setItem("ViewTransactionsAssetData", JSON.stringify(data));
        this.route.navigate(['/timeline']);
    };
    AuditorInvoiceComponent.prototype.createInvoiceDirectly = function () {
        this.route.navigate(['createInvoice']);
    };
    AuditorInvoiceComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
    };
    AuditorInvoiceComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    AuditorInvoiceComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    AuditorInvoiceComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getInvoices(); // send filter parameters along
    };
    AuditorInvoiceComponent.prototype.viewInvoice = function (a) {
        var _this = this;
        console.log(a);
        this.http.viewInvoice({ invoiceNumber: a }).subscribe(function (response) {
            console.log(response);
            var resp = response;
            console.log(resp);
            var file = new Blob([resp.json()], {
                type: 'application/pdf'
            });
            _this.fileUrl = URL.createObjectURL(file);
            console.log(_this.fileUrl);
            window.open(_this.fileUrl, '_blank');
        }, function (error) { return console.log(error); });
    };
    AuditorInvoiceComponent.prototype.viewSignedInvoice = function (element) {
        var _this = this;
        console.log(element);
        this.http.viewSignedInvoiceFromChecked(element).subscribe(function (response) {
            console.log(response);
            var resp = response;
            console.log(resp);
            var file = new Blob([resp.json()], {
                type: 'application/pdf'
            });
            _this.fileUrl = URL.createObjectURL(file);
            var a = document.createElement('a');
            a.setAttribute('style', 'display:none');
            a.href = _this.fileUrl;
            a.download = response.json().filename;
            a.click();
            window.URL.revokeObjectURL(_this.fileUrl);
            console.log(_this.fileUrl);
            window.open(_this.fileUrl, '_blank');
        }, function (error) { return console.log(error); });
    };
    AuditorInvoiceComponent.prototype.addNewInvoiceTab = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], AuditorInvoiceComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], AuditorInvoiceComponent.prototype, "sort", void 0);
    AuditorInvoiceComponent = __decorate([
        Component({
            selector: 'app-auditorinvoice',
            templateUrl: './auditorInvoice.html',
            styleUrls: ['./auditorInvoice.scss']
        }),
        __metadata("design:paramtypes", [RestService, Router])
    ], AuditorInvoiceComponent);
    return AuditorInvoiceComponent;
}());
export { AuditorInvoiceComponent };
//# sourceMappingURL=orderInvoice.js.map