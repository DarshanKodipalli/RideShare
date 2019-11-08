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
var BankerInvoiceFileUploadComponent = /** @class */ (function () {
    function BankerInvoiceFileUploadComponent(http) {
        this.http = http;
        this.multiple = false;
    }
    BankerInvoiceFileUploadComponent.prototype.upload = function () {
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        var formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (var i = 0; i < fileCount; i++) {
                formData.append('files', inputEl.files.item(i));
            }
            this.http.setPayment(formData);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BankerInvoiceFileUploadComponent.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], BankerInvoiceFileUploadComponent.prototype, "inputEl", void 0);
    BankerInvoiceFileUploadComponent = __decorate([
        Component({
            selector: 'file-upload-paymentbaker',
            template: '  <label style="color:black" for="files" class="btn">Upload Receipt</label>  <input type="file" id="files" style="margin-left: 2%;" #fileInput >'
            /*    template: '<input type="file" [multiple]="multiple" #fileInput>'*/
        }),
        __metadata("design:paramtypes", [RestService])
    ], BankerInvoiceFileUploadComponent);
    return BankerInvoiceFileUploadComponent;
}());
export { BankerInvoiceFileUploadComponent };
//# sourceMappingURL=fileUpload.js.map