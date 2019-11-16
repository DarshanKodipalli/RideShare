var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
var InvoiceNewDetailComponent = /** @class */ (function () {
    function InvoiceNewDetailComponent(http, route) {
        this.http = http;
        this.route = route;
        this.checkerDetail = {};
        this.multiple = false;
        var data = JSON.parse(localStorage.getItem("InvoiceCheckerData"));
        console.log(data);
        this.checkerDetail = data;
    }
    InvoiceNewDetailComponent.prototype.ngOnInit = function () {
    };
    InvoiceNewDetailComponent.prototype.readURL = function (event) {
        var _this = this;
        var inputEl = this.inputEl.nativeElement;
        console.log(inputEl);
        console.log(event);
        if (inputEl.files) {
            var file = inputEl.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) { return _this.imageSrc = reader_1.result; };
            reader_1.readAsDataURL(file);
        }
        var fileCount = inputEl.files.length;
        var formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (var i = 0; i < fileCount; i++) {
                formData.append('files', inputEl.files.item(i));
            }
            this.http.setSignatureTemp(formData);
        }
    };
    InvoiceNewDetailComponent.prototype.approveInvoice = function (element) {
        var _this = this;
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
                console.log(_this.http.getSignatureTemp());
                var formData = _this.http.getSignatureTemp();
                var invoiceApproveData = {};
                invoiceApproveData.id = element.invoiceNumber;
                invoiceApproveData.orderNumber = element.orderNumber;
                invoiceApproveData.itmes = element.items;
                console.log(invoiceApproveData);
                formData.append("checkerApproveData", JSON.stringify(invoiceApproveData));
                _this.http.checkerApproveInvoice(formData).subscribe(function (response) {
                    console.log(response.json());
                    Swal('Invoice Approved and Signed', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                        if (newResult.value) {
                            _this.route.navigate(['dashboard']);
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
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InvoiceNewDetailComponent.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], InvoiceNewDetailComponent.prototype, "inputEl", void 0);
    InvoiceNewDetailComponent = __decorate([
        Component({
            selector: 'app-invoice-new-detail',
            templateUrl: './invoice-new-detail.component.html',
            styleUrls: ['./invoice-new-detail.component.scss']
        }),
        __metadata("design:paramtypes", [RestService, Router])
    ], InvoiceNewDetailComponent);
    return InvoiceNewDetailComponent;
}());
export { InvoiceNewDetailComponent };
//# sourceMappingURL=invoice-new-detail.component.js.map