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
import Swal from 'sweetalert2';
import { RestService } from '../services/rest.service';
var ELEMENT_DATA = [];
var PaymentBuyerComponent = /** @class */ (function () {
    function PaymentBuyerComponent(service) {
        this.service = service;
        this.displayedColumns = ['select', 'paymentNumber', 'amount', 'sellerId', 'buyerId', 'createdDate', 'UTRNumber', 'status', 'actions'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.loadGridSpinner = true;
        this.data = [];
    }
    PaymentBuyerComponent.prototype.ngOnInit = function () {
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
    PaymentBuyerComponent.prototype.getOrders = function () {
        var _this = this;
        this.data = [];
        this.service.getPaymentsMade()
            .subscribe(function (res) {
            console.log(res.json());
            var dataSource = [];
            dataSource = res.json().data;
            for (var i = 0; i < dataSource.length; i++) {
                var createdDate = dataSource[i].created.split('T')[0];
                var buyerId = 'buyer1@aeries.io';
                var sellerId = 'seller1@aeries.io';
                var bankerId = dataSource[i].banker.split('#')[1];
                dataSource[i].buyerId = buyerId;
                dataSource[i].sellerId = sellerId;
                dataSource[i].bankerId = bankerId;
                dataSource[i].createdDate = createdDate;
                dataSource[i].cost = dataSource[i].amount;
                dataSource[i].status = dataSource[i].statusMessage;
                if (dataSource[i].statusCode === 206) {
                    dataSource[i].toolTip = "Payment Acknowledged";
                    dataSource[i].buttonType = "block";
                }
                else {
                    dataSource[i].toolTip = "Acknowledge Payment";
                    dataSource[i].buttonType = "done_all";
                }
                dataSource[i].invoiceDescription = "Write your description here";
                dataSource[i].href = "http://localhost:3000/api/v1/report?template=invoice&id=" + dataSource[i].invoiceNumber;
                if (dataSource[i].statusCode === 206 || dataSource[i].statusCode === 201) {
                    _this.data.push(dataSource[i]);
                }
            }
            _this.dataSource = new MatTableDataSource(_this.data);
            setTimeout(function () {
                _this.hideGridSpinner();
            }, 0);
            //this.dataSource.sort = this.sort;
            //console.log(invoices);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    PaymentBuyerComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    PaymentBuyerComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    PaymentBuyerComponent.prototype.addTab = function (row) {
        //console.log("Adding Tab: Clicked row"+JSON.stringify(row));
    };
    PaymentBuyerComponent.prototype.showGridSpinner = function () {
        this.loadGridSpinner = true;
    };
    PaymentBuyerComponent.prototype.hideGridSpinner = function () {
        this.loadGridSpinner = false;
    };
    PaymentBuyerComponent.prototype.reloadGrid = function () {
        this.showGridSpinner();
        this.getOrders(); // send filter parameters along
    };
    PaymentBuyerComponent.prototype.addNewOrderTab = function () {
    };
    PaymentBuyerComponent.prototype.viewPaymentReceipt = function (a) {
        var _this = this;
        console.log(a);
        this.service.viewPaymentBuyer({ paymentNumber: a }).subscribe(function (response) {
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
    PaymentBuyerComponent.prototype.acknowledgePayment = function (i) {
        var _this = this;
        Swal({
            title: 'Acknowledge the Payment?',
            text: 'This\'ll Acknowledge the payment!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Acknowledge',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                console.log(i);
                _this.service.approvePayment(i).subscribe(function (response) {
                    console.log(response);
                    Swal('Payment Acknowledge', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
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
    };
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], PaymentBuyerComponent.prototype, "changing", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], PaymentBuyerComponent.prototype, "sort", void 0);
    PaymentBuyerComponent = __decorate([
        Component({
            selector: 'app-paymentbuyer',
            templateUrl: './paymentBuyer.html'
        }),
        __metadata("design:paramtypes", [RestService])
    ], PaymentBuyerComponent);
    return PaymentBuyerComponent;
}());
export { PaymentBuyerComponent };
//# sourceMappingURL=paymentBuyer.js.map