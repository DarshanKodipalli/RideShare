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
import { AppComponent } from '../app.component';
import { RestService } from '../services/rest.service';
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent(appCompo, http) {
        var _this = this;
        this.appCompo = appCompo;
        this.http = http;
        this.transactionData = {};
        this.transactionDetails = [];
        this.specificDetail = {};
        this.orderDetails = [];
        this.orderNumber = "";
        this.temp = [];
        this.order = [];
        this.payment = [];
        this.orderCreated = {};
        this.orderSubmitted = {};
        this.orderApproved = {};
        this.invoiceCreated = {};
        this.invoiceSubmitted = {};
        this.invoiceApproved = {};
        this.sellerInvoiceAccept = {};
        this.sellerInvoiceProposal = {};
        this.paymentCreatedBB = {};
        this.paymentAcknowledged = {};
        this.buyerPayentBanker = {};
        this.completeJson = "";
        this.orderCreatedBool = false;
        this.sellerInvoiceAcceptBool = false;
        this.orderSubmittedBool = false;
        this.orderApprovedBool = false;
        this.invoiceCreatedBool = false;
        this.invoiceSubmittedBool = false;
        this.invoiceApprovedBool = false;
        this.sellerInvoiceProposalBool = false;
        this.paymentCreatedBBBool = false;
        this.invoiceNumber = "";
        this.currentStatus = "";
        this.currentStatusColor = {};
        this.nextOperation = "";
        var data = JSON.parse(localStorage.getItem("ViewTransactionsAssetData"));
        console.log("____________________");
        console.log(data);
        this.orderNumber = data.orderNumber;
        console.log("____________________");
        this.specificDetail.id = "";
        this.specificDetail.timestamp = "";
        this.specificDetail.buyerId = "";
        this.specificDetail.sellerId = "";
        this.http.getTransactionOrderDetails(data.orderNumber).subscribe(function (response) {
            console.log("Order Details:");
            console.log(response.json());
            _this.temp = response.json().data;
            if (response.json().data[0]) {
                _this.orderCreated = response.json().data[0];
                _this.orderCreated.dispTransactionId = _this.orderCreated.transactionId.substr(0, 14) + "...";
                _this.orderCreatedBool = true;
                _this.currentStatus = _this.orderCreated.description;
                _this.currentStatusColor = { "color": "purple" };
                _this.nextOperation = "Submitting the Order";
                _this.invoiceNumber = "Invoice not Created";
                console.log("orderCreatedBool" + _this.orderCreatedBool);
            }
            if (response.json().data[1]) {
                _this.orderSubmitted = response.json().data[1];
                _this.orderSubmitted.dispTransactionId = _this.orderSubmitted.transactionId.substr(0, 14) + "...";
                _this.orderSubmittedBool = true;
                _this.nextOperation = "Approving the Order";
                _this.currentStatus = _this.orderSubmitted.description;
                _this.currentStatusColor = { "color": "orange" };
                _this.invoiceNumber = "Invoice not Created";
                console.log("orderSubmittedBool:" + _this.orderSubmittedBool);
            }
            if (response.json().data[2]) {
                _this.orderApproved = response.json().data[2];
                _this.orderApproved.dispTransactionId = _this.orderApproved.transactionId.substr(0, 14) + "...";
                _this.orderApprovedBool = true;
                _this.nextOperation = "Creating the Invoice";
                _this.currentStatus = _this.orderApproved.description;
                _this.currentStatusColor = { "color": "teal" };
                _this.invoiceNumber = "Invoice not Created";
                console.log("orderApprovedBool:" + _this.orderApprovedBool);
            }
            _this.http.getTransactionInvoiceDetails(data.invoiceNumber).subscribe(function (response) {
                console.log(response.json());
                _this.order = response.json().data;
                if (_this.order[0]) {
                    _this.invoiceCreated = _this.order[0];
                    _this.invoiceCreated.dispTransactionId = _this.invoiceCreated.transactionId.substr(0, 14) + "...";
                    _this.invoiceCreatedBool = true;
                    _this.currentStatus = _this.invoiceCreated.description;
                    _this.nextOperation = "Submitting the Invoice";
                    _this.currentStatusColor = { "color": "pink" };
                    _this.invoiceNumber = _this.invoiceCreated.assetId;
                    console.log("invoiceCreatedBool" + _this.invoiceCreatedBool);
                }
                if (_this.order[1]) {
                    _this.invoiceSubmitted = _this.order[1];
                    _this.invoiceSubmitted.dispTransactionId = _this.invoiceSubmitted.transactionId.substr(0, 14) + "...";
                    _this.invoiceSubmittedBool = true;
                    _this.currentStatus = _this.invoiceSubmitted.description;
                    _this.nextOperation = "Approving the Invoice";
                    _this.currentStatusColor = { "color": "indigo" };
                    console.log("invoiceSubmittedBool" + _this.invoiceSubmittedBool);
                }
                if (_this.order[2]) {
                    _this.invoiceApproved = _this.order[2];
                    _this.invoiceApproved.dispTransactionId = _this.invoiceApproved.transactionId.substr(0, 14) + "...";
                    _this.invoiceApprovedBool = true;
                    _this.currentStatus = _this.invoiceApproved.description;
                    _this.nextOperation = "Accept the Invoice ";
                    _this.currentStatusColor = { "color": "purple" };
                    console.log("invoiceApprovedBool" + _this.invoiceApprovedBool);
                }
                if (_this.order[3]) {
                    _this.sellerInvoiceAccept = _this.order[3];
                    _this.sellerInvoiceAccept.dispTransactionId = _this.sellerInvoiceAccept.transactionId.substr(0, 14) + "...";
                    _this.sellerInvoiceAcceptBool = true;
                    _this.currentStatus = _this.sellerInvoiceAccept.description;
                    _this.nextOperation = "Propose the Invoice";
                    _this.currentStatusColor = { "color": "teal" };
                    console.log("sellerInvoiceProposalBool" + _this.sellerInvoiceAcceptBool);
                }
                if (_this.order[4]) {
                    _this.sellerInvoiceProposal = _this.order[4];
                    _this.sellerInvoiceProposal.dispTransactionId = _this.sellerInvoiceProposal.transactionId.substr(0, 14) + "...";
                    _this.sellerInvoiceProposalBool = true;
                    _this.currentStatus = _this.sellerInvoiceProposal.description;
                    _this.nextOperation = "Banker Payment";
                    _this.currentStatusColor = { "color": "teal" };
                    console.log("sellerInvoiceProposalBool" + _this.sellerInvoiceProposalBool);
                }
                _this.http.getTransactionPaymentDetails(data.paymentNumber).subscribe(function (response) {
                    console.log(response.json());
                    _this.payment = response.json().data;
                    console.log(_this.payment);
                    if (_this.payment[0]) {
                        _this.paymentCreatedBB = _this.payment[0];
                        _this.paymentCreatedBB.dispTransactionId = _this.paymentCreatedBB.transactionId.substr(0, 14) + "...";
                        _this.paymentCreatedBBBool = true;
                        _this.nextOperation = "Payment Acknowledgement";
                        _this.currentStatusColor = { "color": "teal" };
                        _this.currentStatus = _this.paymentCreatedBB.description;
                        console.log("paymentCreatedBBBool" + _this.paymentCreatedBBBool);
                    }
                    if (_this.payment[0]) {
                        _this.paymentCreatedBB = _this.payment[0];
                        _this.paymentCreatedBB.dispTransactionId = _this.paymentCreatedBB.transactionId.substr(0, 14) + "...";
                        _this.paymentCreatedBBBool = true;
                        _this.nextOperation = "Buyer payment to Banker";
                        _this.currentStatusColor = { "color": "teal" };
                        _this.currentStatus = _this.paymentCreatedBB.description;
                        console.log("paymentCreatedBBBool" + _this.paymentCreatedBBBool);
                    }
                    if (_this.payment[0]) {
                        _this.paymentCreatedBB = _this.payment[0];
                        _this.paymentCreatedBB.dispTransactionId = _this.paymentCreatedBB.transactionId.substr(0, 14) + "...";
                        _this.paymentCreatedBBBool = true;
                        _this.nextOperation = "Payment Acknowledgement";
                        _this.currentStatusColor = { "color": "teal" };
                        _this.currentStatus = _this.paymentCreatedBB.description;
                        console.log("paymentCreatedBBBool" + _this.paymentCreatedBBBool);
                    }
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    }
    TimelineComponent.prototype.ngOnInit = function () {
    };
    TimelineComponent.prototype.getDetails = function (y) {
        var _this = this;
        this.http.getSpecificTransactionDetail(y).subscribe(function (response) {
            console.log("______________________");
            console.log(response.json());
            _this.specificDetail = response.json().data[0];
            _this.specificDetail.sellerId = _this.specificDetail.seller.split('#')[1];
            _this.specificDetail.buyerId = _this.specificDetail.buyer.split('#')[1];
            _this.specificDetail.bankerId = _this.specificDetail.banker.split('#')[1];
            _this.completeJson = "{" + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'amount':" + "'" + _this.specificDetail.amount + "'," + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'banker':" + "'" + _this.specificDetail.bankerId + "'," + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'seller':" + "'" + _this.specificDetail.sellerId + "'," + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'banker':" + "'" + _this.specificDetail.buyerId + "'," + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'timeStamp':" + "'" + _this.specificDetail.timestamp + "'," + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "'transactionId':" + "'" + _this.specificDetail.transactionId + "'" + "\n" +
                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "}";
        }, function (error) {
            console.log(error);
        });
    };
    TimelineComponent = __decorate([
        Component({
            selector: 'app-timeline',
            templateUrl: './timeline.component.html',
            styleUrls: ['./timeline.component.scss']
        }),
        __metadata("design:paramtypes", [AppComponent, RestService])
    ], TimelineComponent);
    return TimelineComponent;
}());
export { TimelineComponent };
//# sourceMappingURL=timeline.component.js.map