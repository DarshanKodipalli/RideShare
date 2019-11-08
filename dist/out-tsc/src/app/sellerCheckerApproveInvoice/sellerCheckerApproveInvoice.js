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
var SellerCheckerApproveInvoice = /** @class */ (function () {
    function SellerCheckerApproveInvoice(http, route) {
        this.http = http;
        this.route = route;
        this.displayedColumns = ['select', 'invoiceNumber', 'orderNumber', 'amount', 'sellerId', 'bankerId', 'createdDate', 'status', 'transaction'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
        this.actualData = [];
    }
    SellerCheckerApproveInvoice.prototype.ngOnInit = function () {
        // loadData
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        this.getInvoices();
    };
    SellerCheckerApproveInvoice.prototype.getInvoices = function () {
        var _this = this;
        this.dataSource = [];
        this.actualData = [];
        this.http.getToBeApprovedInvoices()
            .subscribe(function (res) {
            console.log(res.json());
            var invoices = JSON.parse(res['_body']).invoices;
            var dataSource = [];
            dataSource = res.json().invoices;
            for (var i = 0; i < dataSource.length; i++) {
                var createdDate = dataSource[i].created.split('T')[0];
                var buyerId = dataSource[i].buyer.split('#')[1];
                var bankerId = dataSource[i].banker.split('#')[1];
                dataSource[i].buyerId = buyerId;
                dataSource[i].bankerId = bankerId;
                dataSource[i].createdDate = createdDate;
                dataSource[i].cost = dataSource[i].amount;
                dataSource[i].status = dataSource[i].statusMessage;
                dataSource[i].invoiceDescription = "Write your description here";
                if (dataSource[i].statusCode === 103) {
                    dataSource[i].toolTip = "Approve Invoice";
                    dataSource[i].buttonType = "done_all";
                    _this.actualData.push(dataSource[i]);
                }
                else if (dataSource[i].statusCode === 104) {
                    dataSource[i].toolTip = "Invoice Approved";
                    dataSource[i].buttonType = "block";
                    _this.actualData.push(dataSource[i]);
                }
                else {
                }
                dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
            }
            _this.dataSource = new MatTableDataSource(_this.actualData);
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(invoices);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    SellerCheckerApproveInvoice.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    SellerCheckerApproveInvoice.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    SellerCheckerApproveInvoice.prototype.timeline = function (data) {
        localStorage.setItem("ViewTransactionsAssetData", JSON.stringify(data));
        this.route.navigate(['/timeline']);
    };
    SellerCheckerApproveInvoice.prototype.createInvoiceDirectly = function () {
        this.route.navigate(['createInvoice']);
    };
    SellerCheckerApproveInvoice.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
    };
    SellerCheckerApproveInvoice.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    SellerCheckerApproveInvoice.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    SellerCheckerApproveInvoice.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getInvoices(); // send filter parameters along
    };
    SellerCheckerApproveInvoice.prototype.viewInvoice = function (a) {
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
    SellerCheckerApproveInvoice.prototype.addNewInvoiceTab = function () {
    };
    SellerCheckerApproveInvoice.prototype.addNewInvoiceTabWithElement = function (element) {
        localStorage.setItem("InvoiceCheckerData", JSON.stringify(element));
        this.route.navigate(['detailapproveInvoice']);
        /*    Swal({
              title: 'Approve the Invoice?',
              text: 'This\'ll Approve the Invoice you have Received!',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Approve',
              cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value) {
                    console.log(element);
                    var invoiceApproveData:any = {};
                    invoiceApproveData.id = element.invoiceNumber;
                    invoiceApproveData.orderNumber = element.orderNumber;
                    invoiceApproveData.itmes = element.items;
                    console.log(invoiceApproveData);
                    this.http.checkerApproveInvoice(invoiceApproveData).subscribe(
                      (response)=>{
                        console.log(response.json())
                        Swal(
                          'Invoice Approved and Signed',
                          'Transaction Hash: '+response.json().transactionHash+'',
                          'success'
                        ).then((newResult)=>{
                          if(newResult.value){
                            this.reloadGrid();
                          }
                        })
                      },(error)=>{
                        console.log(error);
                      })
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal(
                  'Cancelled',
                  'A Invoice isn\'t Approved yet',
                  'error'
                )
              }
            })
          }*/
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], SellerCheckerApproveInvoice.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], SellerCheckerApproveInvoice.prototype, "sort", void 0);
    SellerCheckerApproveInvoice = __decorate([
        Component({
            selector: 'app-approve-invoice',
            templateUrl: './sellerCheckerApproveInvoice.html'
        }),
        __metadata("design:paramtypes", [RestService, Router])
    ], SellerCheckerApproveInvoice);
    return SellerCheckerApproveInvoice;
}());
export { SellerCheckerApproveInvoice };
//# sourceMappingURL=sellerCheckerApproveInvoice.js.map