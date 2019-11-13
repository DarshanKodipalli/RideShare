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
import { InvoicePageComponent } from '../invoice-page/invoice-page.component';
import { Subject } from 'rxjs/Subject';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
var ELEMENT_DATA = [];
var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(invoice, http, route) {
        this.invoice = invoice;
        this.http = http;
        this.route = route;
        this.displayedColumns = ['select', 'invoiceNumber', 'orderNumber', 'amount', 'sellerId', 'bankerId', 'createdDate', 'status', 'transaction'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
        this.createInvoice = {};
        this.searchParams = {};
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // loadData
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        this.getInvoices();
        this.changing.subscribe(function (v) {
            console.log("tab changed" + v);
            // refresh grid on tab change
            _this.reloadGrid();
        });
    };
    InvoiceComponent.prototype.getInvoices = function () {
        var _this = this;
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
                if (dataSource[i].statusCode === 107 && _this.role === "seller") {
                    dataSource[i].toolTip = "Invoice Sent";
                    dataSource[i].buttonType = "block";
                }
                else if (dataSource[i].statusCode === 101 && _this.role === "seller") {
                    dataSource[i].toolTip = "Send Invoice";
                    dataSource[i].buttonType = "send";
                }
                else if (dataSource[i].statusCode === 103 && _this.role === "seller") {
                    dataSource[i].toolTip = "Invoice Sent";
                    dataSource[i].buttonType = "block";
                }
                else if (dataSource[i].statusCode === 107 && _this.role === "buyer") {
                    dataSource[i].toolTip = "Propose Invoice";
                    dataSource[i].buttonType = "input";
                }
                else if (dataSource[i].statusCode === 103 && _this.role === "buyer") {
                    dataSource[i].toolTip = "Approve Invoice";
                    dataSource[i].buttonType = "done";
                }
                else if (dataSource[i].statusCode === 104 && _this.role === "buyer") {
                    dataSource[i].toolTip = "Approve Invoice";
                    dataSource[i].buttonType = "done";
                }
                else {
                    dataSource[i].toolTip = "Invoice Sent";
                    dataSource[i].buttonType = "block";
                }
                dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
            }
            _this.dataSource = new MatTableDataSource(dataSource);
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(invoices);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    InvoiceComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    InvoiceComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    InvoiceComponent.prototype.timeline = function (data) {
        localStorage.setItem("ViewTransactionsAssetData", JSON.stringify(data));
        this.route.navigate(['/timeline']);
    };
    InvoiceComponent.prototype.createInvoiceDirectly = function () {
        this.route.navigate(['createInvoice']);
    };
    InvoiceComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
        this.invoice.addTab(row.invoiceNumber, 'detail');
    };
    InvoiceComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    InvoiceComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    InvoiceComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getInvoices(); // send filter parameters along
    };
    InvoiceComponent.prototype.viewInvoice = function (a) {
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
    InvoiceComponent.prototype.invoiceSearch = function (searchParams) {
        console.log(searchParams);
        this.http.searchInvoices(searchParams).subscribe(function (response) {
            console.log(response.json());
        }, function (error) {
            console.log(error);
        });
    };
    InvoiceComponent.prototype.viewSignedInvoice = function (element) {
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
    InvoiceComponent.prototype.addNewInvoiceTab = function () {
        this.invoice.addTab(null, 'new');
    };
    InvoiceComponent.prototype.addNewInvoiceTabWithElement = function (element) {
        var _this = this;
        if (element.statusCode === 104) {
            this.http.viewSignedInvoiceFromChecked(element).subscribe(function (response) {
                console.log(response);
                var resp = response;
                console.log(resp);
                var file = new Blob([resp.json()], {
                    type: 'application/pdf'
                });
                _this.fileUrl = URL.createObjectURL(file);
                console.log(_this.fileUrl);
                window.open(_this.fileUrl, '_blank');
                Swal({
                    title: 'Approve the Invoice?',
                    text: 'This\'ll Approve the Invoice you have Received!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Approve',
                    cancelButtonText: 'Cancel'
                }).then(function (result) {
                    if (result.value) {
                        console.log(element);
                        var invoiceApproveData = {};
                        invoiceApproveData.id = element.invoiceNumber;
                        invoiceApproveData.orderNumber = element.orderNumber;
                        invoiceApproveData.itmes = element.items;
                        console.log(invoiceApproveData);
                        _this.http.approveInvoice(invoiceApproveData).subscribe(function (response) {
                            console.log(response.json());
                            Swal('Invoice Approved', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                                if (newResult.value) {
                                    _this.reloadGrid();
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal('Cancelled', 'A Invoice isn\'t Approved yet', 'error');
                    }
                });
            }, function (error) { return console.log(error); });
        }
        else if (element.statusCode === 107) {
            Swal({
                title: 'Propose the Invoice to the Banker?',
                text: 'This\'ll propose an Invoice to the banker !',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Propose',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    var sendInvoiceData = {};
                    sendInvoiceData.id = element.invoiceNumber;
                    sendInvoiceData.orderNumber = element.orderNumber;
                    sendInvoiceData.invoiceDescription = element.invoiceDescription;
                    console.log(sendInvoiceData);
                    _this.http.proposeInvoice(sendInvoiceData).subscribe(function (response) {
                        Swal('Invoice Proposed', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                            if (newResult.value) {
                                _this.reloadGrid();
                            }
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A Invoice isn\'t proposed to the Buyer yet', 'error');
                }
            });
        }
        else {
            localStorage.setItem("InvoiceData", JSON.stringify(element));
            this.invoice.addTab(null, 'new');
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], InvoiceComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], InvoiceComponent.prototype, "sort", void 0);
    InvoiceComponent = __decorate([
        Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.scss']
        }),
        __metadata("design:paramtypes", [InvoicePageComponent,
            RestService, Router])
    ], InvoiceComponent);
    return InvoiceComponent;
}());
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map