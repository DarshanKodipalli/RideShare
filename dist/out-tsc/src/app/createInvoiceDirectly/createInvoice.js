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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestService } from '../services/rest.service';
var CreateInvoiceDirectlyComponent = /** @class */ (function () {
    function CreateInvoiceDirectlyComponent(route, http) {
        this.route = route;
        this.http = http;
        this.sendInvo = {};
    }
    CreateInvoiceDirectlyComponent.prototype.ngOnInit = function () {
        console.log("Update Profile");
        var loginData = JSON.parse(localStorage.getItem("login"));
        console.log(loginData);
    };
    CreateInvoiceDirectlyComponent.prototype.logout = function () {
        localStorage.clear();
        this.route.navigate(['login']);
    };
    CreateInvoiceDirectlyComponent.prototype.sendInvoiceDirectly = function (invoice) {
        var _this = this;
        console.log(invoice);
        console.log(this.http.getDirectInvoiceTemp());
        if (this.http.getDirectInvoiceTemp()) {
            invoice.sendDirectly = true;
            this.http.createInvoice(invoice).subscribe(function (response) {
                console.log(response.json());
                var invoiceData = {};
                invoiceData = invoice;
                invoiceData.id = response.json().invoiceNumber;
                var formData = _this.http.getDirectInvoiceTemp();
                console.log(_this.http.getDirectInvoiceTemp());
                formData.append("InvoiceData", JSON.stringify(invoiceData));
                console.log(formData);
                _this.http.sendInvoice(formData).subscribe(function (response) {
                    Swal('Invoice Sent', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                        if (newResult.value) {
                            _this.route.navigate(['invoice']);
                        }
                    });
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }
    };
    CreateInvoiceDirectlyComponent = __decorate([
        Component({
            selector: 'app-createDirectInvoice',
            templateUrl: './createInvoice.html'
        }),
        __metadata("design:paramtypes", [Router, RestService])
    ], CreateInvoiceDirectlyComponent);
    return CreateInvoiceDirectlyComponent;
}());
export { CreateInvoiceDirectlyComponent };
//# sourceMappingURL=createInvoice.js.map