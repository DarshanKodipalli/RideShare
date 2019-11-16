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
import { PaymentPageComponent } from '../payment-page/payment-page.component';
import { RestService } from '../services/rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
var ELEMENT_DATA = [];
var PaymentDetailComponent = /** @class */ (function () {
    function PaymentDetailComponent(payment, http, route) {
        this.payment = payment;
        this.http = http;
        this.route = route;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = ELEMENT_DATA;
        this.paymentData = {};
        this.title = '';
        this.paymentData = JSON.parse(localStorage.getItem("PaymentInvoice"));
        console.log(this.paymentData);
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.role = loginData.role;
    }
    PaymentDetailComponent.prototype.ngOnInit = function () {
        console.log("loading page");
        this.title = this.payment.getCurrentTab();
    };
    PaymentDetailComponent.prototype.removeTab = function () {
        this.payment.removeTab();
    };
    PaymentDetailComponent.prototype.makePayment = function (invoiceData) {
        var _this = this;
        if (this.role === 'banker') {
            Swal({
                title: 'Record the Payent?',
                text: 'This\'ll record the payment you\'ve made to the Seller !',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Record',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    if (_this.http.getPayment()) {
                        var formData = _this.http.getPayment();
                        formData.append('paymentData', JSON.stringify(invoiceData));
                        console.log(invoiceData);
                        _this.http.makePayment(formData).subscribe(function (response) {
                            Swal('Payment Recorded', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                                if (newResult.value) {
                                    _this.route.navigate(['dashboard']);
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal('Cancelled', 'A Invoice isn\'t Sent to the Buyer yet', 'error');
                }
            });
        }
        else {
            Swal({
                title: 'Record the Payent?',
                text: 'This\'ll record the payment you\'ve made to the Banker !',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Record',
                cancelButtonText: 'Cancel'
            }).then(function (result) {
                if (result.value) {
                    if (_this.http.getPayment()) {
                        var formData = _this.http.getPayment();
                        formData.append('paymentData', JSON.stringify(invoiceData));
                        console.log(invoiceData);
                        _this.http.makePayment(formData).subscribe(function (response) {
                            Swal('Payment Recorded', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                                if (newResult.value) {
                                    _this.route.navigate(['dashboard']);
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal('Cancelled', 'A Invoice isn\'t Sent to the Buyer yet', 'error');
                    }
                }
            });
        }
    };
    PaymentDetailComponent = __decorate([
        Component({
            selector: 'app-payment-detail',
            templateUrl: './payment-detail.component.html',
            styleUrls: ['./payment-detail.component.scss']
        }),
        __metadata("design:paramtypes", [PaymentPageComponent, RestService, Router])
    ], PaymentDetailComponent);
    return PaymentDetailComponent;
}());
export { PaymentDetailComponent };
//# sourceMappingURL=payment-detail.component.js.map