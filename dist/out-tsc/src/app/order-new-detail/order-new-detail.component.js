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
import { OrderPageComponent } from '../order-page/order-page.component';
import Swal from 'sweetalert2';
import { RestService } from '../services/rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
var ELEMENT_DATA = [];
var OrderNewDetailComponent = /** @class */ (function () {
    function OrderNewDetailComponent(order, http, rout, spinnerService) {
        this.order = order;
        this.http = http;
        this.rout = rout;
        this.spinnerService = spinnerService;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.newItemAttribute = {};
        this.itemsAddedBool = false;
        this.newItem = [];
        this.totalItemsAdded = 0;
        this.dataSource = [];
        this.sellerID = "";
        this.sellerID = "seller1@aeries.io";
    }
    OrderNewDetailComponent.prototype.ngOnInit = function () {
    };
    OrderNewDetailComponent.prototype.addItem = function (itemDetails) {
        this.dataSource = [];
        this.itemsAddedBool = true;
        console.log(itemDetails);
        this.totalCost += itemDetails.price;
        this.newItem.push(itemDetails);
        this.newItemAttribute = {};
        ++this.totalItemsAdded;
        console.log(this.newItem);
        this.dataSource = this.newItem;
    };
    OrderNewDetailComponent.prototype.createOrder = function (seller) {
        var _this = this;
        Swal({
            title: 'Create Purchase Order?',
            text: 'This\'ll create a new Purchase order with the fields provided!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                _this.spinnerService.show();
                var orderData = {};
                orderData.seller = seller;
                orderData.items = _this.newItem;
                console.log(orderData);
                _this.http.addAsset(orderData).subscribe(function (response) {
                    if (response) {
                        _this.spinnerService.hide();
                        console.log("Response");
                        var resp = response.json();
                        Swal('Purchase Order created', 'Transaction Hash: ' + resp.transactionHash + '', 'success').then(function (newResult) {
                            if (newResult.value) {
                                _this.rout.navigate(['/order']);
                            }
                        });
                    }
                }, function (error) {
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal('Cancelled', 'A new asset isn\'t added yet', 'error');
            }
        });
    };
    OrderNewDetailComponent.prototype.removeTab = function () {
        this.order.removeTab();
    };
    OrderNewDetailComponent = __decorate([
        Component({
            selector: 'app-order-new-detail',
            templateUrl: './order-new-detail.component.html',
            styleUrls: ['./order-new-detail.component.scss']
        }),
        __metadata("design:paramtypes", [OrderPageComponent, RestService, Router, Ng4LoadingSpinnerService])
    ], OrderNewDetailComponent);
    return OrderNewDetailComponent;
}());
export { OrderNewDetailComponent };
//# sourceMappingURL=order-new-detail.component.js.map