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
var BulkUploadComponentOrders = /** @class */ (function () {
    function BulkUploadComponentOrders(http) {
        this.http = http;
        this.multiple = false;
    }
    BulkUploadComponentOrders.prototype.upload = function () {
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        var formData = new FormData();
        if (fileCount > 0) {
            for (var i = 0; i < fileCount; i++) {
                formData.append('bulkUploadFile', inputEl.files.item(i));
            }
            this.http.setFileTemp(formData);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BulkUploadComponentOrders.prototype, "multiple", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], BulkUploadComponentOrders.prototype, "inputEl", void 0);
    BulkUploadComponentOrders = __decorate([
        Component({
            selector: 'bulk-upload-orders',
            template: '  <label style="color:black" for="files" class="btn">Choose File</label>  <input type="file" id="files" style="margin-left:2%" #fileInput >'
            /*    template: '<input type="file" [multiple]="multiple" #fileInput>'*/
        }),
        __metadata("design:paramtypes", [RestService])
    ], BulkUploadComponentOrders);
    return BulkUploadComponentOrders;
}());
export { BulkUploadComponentOrders };
//# sourceMappingURL=bulkUploadComponent.js.map