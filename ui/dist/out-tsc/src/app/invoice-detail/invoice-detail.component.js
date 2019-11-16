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
import { InvoicePageComponent } from '../invoice-page/invoice-page.component';
import { RestService } from '../services/rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
var ELEMENT_DATA = [];
var InvoiceDetailComponent = /** @class */ (function () {
    function InvoiceDetailComponent(invoice, http, route) {
        this.invoice = invoice;
        this.http = http;
        this.route = route;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = ELEMENT_DATA;
        this.invoiceData = {};
        this.title = '';
        this.invoiceData = JSON.parse(localStorage.getItem("InvoiceData"));
        console.log(this.invoiceData);
    }
    InvoiceDetailComponent.prototype.ngOnInit = function () {
        console.log("loading page");
        this.title = this.invoice.getCurrentTab();
    };
    InvoiceDetailComponent.prototype.removeTab = function () {
        this.invoice.removeTab();
    };
    InvoiceDetailComponent.prototype.sendInvoiceDirectly = function (invoice) {
        var _this = this;
        console.log(invoice);
        console.log(this.http.getInvoice());
        if (this.http.getInvoice()) {
            var formData = this.http.getInvoice();
            console.log(this.http.getInvoice());
            console.log(formData);
            var sendInvoiceData = invoice;
            sendInvoiceData.id = invoice.invoiceNumber;
            sendInvoiceData.sendDirectly = false;
            sendInvoiceData.orderNumber = invoice.orderNumber;
            sendInvoiceData.invoiceDescription = invoice.invoiceDescription;
            console.log(sendInvoiceData);
            formData.append('InvoiceData', JSON.stringify(sendInvoiceData));
            console.log("_____________");
            console.log(formData);
            console.log("_____________");
            this.http.sendInvoice(formData).subscribe(function (response) {
                Swal('Invoice Sent', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                    if (newResult.value) {
                        _this.route.navigate(['invoice']);
                        console.log("Done");
                    }
                });
            }, function (error) {
                console.log(error);
            });
        }
    };
    InvoiceDetailComponent = __decorate([
        Component({
            selector: 'app-invoice-detail',
            templateUrl: './invoice-detail.component.html',
            styleUrls: ['./invoice-detail.component.scss']
        }),
        __metadata("design:paramtypes", [InvoicePageComponent, RestService, Router])
    ], InvoiceDetailComponent);
    return InvoiceDetailComponent;
}());
export { InvoiceDetailComponent };
//# sourceMappingURL=invoice-detail.component.js.map