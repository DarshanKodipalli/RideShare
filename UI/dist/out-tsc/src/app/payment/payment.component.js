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
import { PaymentPageComponent } from '../payment-page/payment-page.component';
import { Subject } from 'rxjs/Subject';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
var ELEMENT_DATA = [];
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(payment, service, route) {
        this.payment = payment;
        this.service = service;
        this.route = route;
        this.displayedColumns = ['select', 'orderNumber', 'amount', 'utrNumber', 'sellerId', 'bankerId', 'createdDate', 'status', 'transaction'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
        this.searchParams = {};
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
        // loadData
        this.getOrders();
        this.changing.subscribe(function (v) {
            console.log("tab changed" + v);
            // refresh grid on tab change
            _this.reloadGrid();
        });
    };
    PaymentComponent.prototype.getOrders = function () {
        var _this = this;
        if (this.role === 'banker') {
            this.service.getToBeApprovedInvoices()
                .subscribe(function (res) {
                console.log(res.json());
                var invoices = JSON.parse(res['_body']).invoices;
                var dataSource = [];
                dataSource = res.json().invoices;
                for (var i = 0; i < dataSource.length; i++) {
                    var createdDate = dataSource[i].created.split('T')[0];
                    var buyerId = dataSource[i].buyer.split('#')[1];
                    var sellerId = dataSource[i].seller.split('#')[1];
                    var bankerId = dataSource[i].banker.split('#')[1];
                    dataSource[i].buyerId = buyerId;
                    dataSource[i].sellerId = sellerId;
                    dataSource[i].bankerId = bankerId;
                    dataSource[i].createdDate = createdDate;
                    dataSource[i].cost = dataSource[i].amount;
                    dataSource[i].status = dataSource[i].statusMessage;
                    if (dataSource[i].statusCode === 108 && _this.role === "banker") {
                        dataSource[i].toolTip = "Accept Proposal and Make Payment";
                        dataSource[i].buttonType = "done_all";
                    }
                    else if (dataSource[i].statusCode === 109 && _this.role === "banker") {
                        dataSource[i].toolTip = "Payment Made";
                        dataSource[i].buttonType = "block";
                    }
                    else if (dataSource[i].statusCode === 109 && _this.role === "buyer") {
                        dataSource[i].toolTip = "Make Payment ";
                        dataSource[i].buttonType = "send";
                    }
                    else if (dataSource[i].statusCode === 103 && _this.role === "seller") {
                        dataSource[i].toolTip = "Invoice Sent";
                        dataSource[i].buttonType = "block";
                    }
                    else if (dataSource[i].statusCode === 107 && _this.role === "buyer") {
                        dataSource[i].toolTip = "Invoice Proposed";
                        dataSource[i].buttonType = "block";
                    }
                    else if (dataSource[i].statusCode === 103 && _this.role === "buyer") {
                        dataSource[i].toolTip = "Approve Invoice";
                        dataSource[i].buttonType = "done";
                    }
                    else if (dataSource[i].statusCode === 106 && _this.role === "buyer") {
                        dataSource[i].toolTip = "Propose Invoice";
                        dataSource[i].buttonType = "input";
                    }
                    else {
                        dataSource[i].toolTip = "Invoice Sent";
                        dataSource[i].buttonType = "block";
                    }
                    dataSource[i].invoiceDescription = "Write your description here";
                    dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
                }
                _this.dataSource = new MatTableDataSource(dataSource);
                setTimeout(function () {
                    _this.hideGridSpinner();
                }, 0);
                //this.dataSource.sort = this.sort;
                //console.log(invoices);
            });
        }
        else if (this.role === "buyer") {
            this.service.getToBeApprovedInvoices()
                .subscribe(function (res) {
                console.log(res.json());
                var invoices = JSON.parse(res['_body']).invoices;
                var dataSource = [];
                dataSource = res.json().invoices;
                var buyerPayment = [];
                for (var i = 0; i < dataSource.length; i++) {
                    var createdDate = dataSource[i].created.split('T')[0];
                    var buyerId = dataSource[i].buyer.split('#')[1];
                    var sellerId = dataSource[i].seller.split('#')[1];
                    var bankerId = dataSource[i].banker.split('#')[1];
                    dataSource[i].buyerId = buyerId;
                    dataSource[i].sellerId = sellerId;
                    dataSource[i].bankerId = bankerId;
                    dataSource[i].createdDate = createdDate;
                    dataSource[i].cost = dataSource[i].amount;
                    dataSource[i].status = dataSource[i].statusMessage;
                    if (dataSource[i].statusCode === 109 && dataSource[i].sellerPaymentStatus) {
                        dataSource[i].toolTip = "Make Payment to the Banker";
                        dataSource[i].buttonType = "payment";
                        buyerPayment.push(dataSource[i]);
                    }
                    else {
                        dataSource[i].toolTip = "Payment Acknowledged";
                        dataSource[i].buttonType = "block";
                        buyerPayment.push(dataSource[i]);
                    }
                    dataSource[i].invoiceDescription = "Write your description here";
                    dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
                }
                _this.dataSource = new MatTableDataSource(buyerPayment);
                setTimeout(function () {
                    _this.hideGridSpinner();
                }, 0);
                //this.dataSource.sort = this.sort;
                //console.log(invoices);
            });
        }
        else {
            this.service.getPaymentsMade()
                .subscribe(function (res) {
                console.log(res.json());
                var dataSource = [];
                dataSource = res.json().data;
                for (var i = 0; i < dataSource.length; i++) {
                    var createdDate = dataSource[i].created.split('T')[0];
                    var buyerId = 'buyer1@aeries.io';
                    var sellerId = dataSource[i].seller.split('#')[1];
                    var bankerId = dataSource[i].banker.split('#')[1];
                    dataSource[i].buyerId = buyerId;
                    dataSource[i].sellerId = sellerId;
                    dataSource[i].bankerId = bankerId;
                    dataSource[i].createdDate = createdDate;
                    dataSource[i].cost = dataSource[i].amount;
                    dataSource[i].status = dataSource[i].statusMessage;
                    if (dataSource[i].statusCode === 201) {
                        dataSource[i].toolTip = "Acknowledge Payment";
                        dataSource[i].buttonType = "done_all";
                    }
                    else if (dataSource[i].statusCode === 205) {
                        dataSource[i].toolTip = "Payment Acknowledged";
                        dataSource[i].buttonType = "block";
                    }
                    else {
                        dataSource[i].toolTip = "Make Payment";
                        dataSource[i].buttonType = "payment";
                    }
                    dataSource[i].invoiceDescription = "Write your description here";
                    dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
                }
                _this.dataSource = new MatTableDataSource(dataSource);
                setTimeout(function () {
                    _this.hideGridSpinner();
                }, 0);
                //this.dataSource.sort = this.sort;
                //console.log(invoices);
            });
        }
    };
    /** Whether the number of selected elements matches the total number of rows. */
    PaymentComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    PaymentComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    PaymentComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
        this.payment.addTab(row.orderNumber, 'detail');
    };
    PaymentComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    PaymentComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    PaymentComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getOrders(); // send filter parameters along
    };
    PaymentComponent.prototype.addNewOrderTab = function () {
        this.payment.addTab(null, 'new');
    };
    PaymentComponent.prototype.paymentSearch = function (searchParams) {
        console.log(searchParams);
        this.service.searchPayments(searchParams).subscribe(function (response) {
            console.log(response.json());
        }, function (error) {
            console.log(error);
        });
    };
    PaymentComponent.prototype.timeline = function (data) {
        localStorage.setItem("ViewTransactionsAssetData", JSON.stringify(data));
        this.route.navigate(['/timeline']);
    };
    PaymentComponent.prototype.viewPaymentReceipt = function (a) {
        var _this = this;
        console.log(a);
        this.service.viewPayment({ paymentNumber: a }).subscribe(function (response) {
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
    PaymentComponent.prototype.addNewOrderTabBanker = function (paymentData) {
        var _this = this;
        if (paymentData.statusCode === 201) {
            Swal({
                title: 'Acknowledge the Payment?',
                text: 'This\'ll Acknowledge the payment!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Acknowledge',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    _this.service.approvePayment(paymentData).subscribe(function (response) {
                        console.log(response);
                        Swal('Payment Acknowledged', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                            if (newResult.value) {
                                _this.reloadGrid();
                            }
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A Payment isn\'t Acknowledge yet', 'error');
                }
            });
        }
        else if (paymentData.statusCode === 109) {
            localStorage.setItem("PaymentInvoice", JSON.stringify(paymentData));
            this.payment.addTab(null, 'new');
        }
        else {
            Swal({
                title: 'Accept the Proposal and Make Payment?',
                text: 'This\'ll accept the proposal!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Accept',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    _this.service.approveBankerPayment(paymentData).subscribe(function (response) {
                        console.log(response);
                        Swal('Proposal Accepted. Make Payment?', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                            if (newResult.value) {
                                localStorage.setItem("PaymentInvoice", JSON.stringify(paymentData));
                                _this.payment.addTab(null, 'new');
                            }
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A Payment isn\'t Acknowledge yet', 'error');
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], PaymentComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], PaymentComponent.prototype, "sort", void 0);
    PaymentComponent = __decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styleUrls: ['./payment.component.scss']
        }),
        __metadata("design:paramtypes", [PaymentPageComponent,
            RestService, Router])
    ], PaymentComponent);
    return PaymentComponent;
}());
export { PaymentComponent };
//# sourceMappingURL=payment.component.js.map