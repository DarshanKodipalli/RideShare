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
import { RestService } from '../services/rest.service';
var BulkuploadComponent = /** @class */ (function () {
    function BulkuploadComponent(http) {
        this.http = http;
        this.updateBuyer = {};
        this.uploadProgress = [];
    }
    BulkuploadComponent.prototype.ngOnInit = function () {
    };
    BulkuploadComponent.prototype.addOrders = function () {
        var _this = this;
        if (this.http.getFileTemp()) {
            var formData = this.http.getFileTemp();
            formData.append("fileType", "order");
            this.http.bulkUploadOrders(formData).subscribe(function (response) {
                console.log(response);
                /*          this.spinnerService.hide();
                          this.rout.navigate(['']);*/
                _this.http.refreshFeed().subscribe(function (response) {
                    console.log(response);
                    var tempResponse = response.json();
                    for (var i = 0; i < tempResponse.data.length; i++) {
                        tempResponse.data[i].uploadedDate = tempResponse.data[i].createDate.split('T')[0];
                        tempResponse.data[i].uploadedTime = tempResponse.data[i].createDate.split('T')[1];
                        _this.uploadProgress.push(tempResponse.data[i]);
                        console.log(_this.uploadProgress);
                    }
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
            });
        }
    };
    BulkuploadComponent.prototype.refreshFeed = function () {
        var _this = this;
        this.uploadProgress = [];
        this.http.refreshFeed().subscribe(function (response) {
            console.log("Refresh Log");
            console.log(response.json());
            var tempResponse = response.json();
            for (var i = 0; i < tempResponse.data.length; i++) {
                tempResponse.data[i].uploadedDate = tempResponse.data[i].createDate.split('T')[0];
                tempResponse.data[i].uploadedTime = tempResponse.data[i].createDate.split('T')[1];
                _this.uploadProgress.push(tempResponse.data[i]);
                console.log(_this.uploadProgress);
            }
        }, function (error) {
            console.log(error);
        });
    };
    BulkuploadComponent = __decorate([
        Component({
            selector: 'app-bulkupload',
            templateUrl: './bulkupload.component.html',
            styleUrls: ['./bulkupload.component.scss']
        }),
        __metadata("design:paramtypes", [RestService])
    ], BulkuploadComponent);
    return BulkuploadComponent;
}());
export { BulkuploadComponent };
//# sourceMappingURL=bulkupload.component.js.map