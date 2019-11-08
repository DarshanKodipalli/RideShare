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
var SetCreditLimitComponent = /** @class */ (function () {
    function SetCreditLimitComponent(route, http) {
        this.route = route;
        this.http = http;
        this.userData = {};
    }
    SetCreditLimitComponent.prototype.ngOnInit = function () {
        console.log("Set Credit Limit");
        this.userData = JSON.parse(localStorage.getItem("userCreditData"));
        console.log(this.userData);
    };
    SetCreditLimitComponent.prototype.logout = function () {
        localStorage.clear();
        this.route.navigate(['login']);
    };
    SetCreditLimitComponent.prototype.setCreditLimit = function (userData, checker) {
        var _this = this;
        Swal({
            title: 'Set the Credit limit to ' + userData.limit + ' ?',
            text: 'This\'ll update the credit limit you\'ve set to the user !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Set',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                console.log(userData);
                if (_this.userData.role === "seller") {
                    userData.checker = checker;
                }
                _this.http.setCreditLimit(userData).subscribe(function (response) {
                    Swal('Credit limit Set', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                        if (newResult.value) {
                            _this.route.navigate(['dashboard']);
                        }
                    });
                }, function (error) {
                    console.log(error);
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal('Cancelled', 'Credit limit isn\'t updated', 'error');
            }
        });
    };
    SetCreditLimitComponent = __decorate([
        Component({
            selector: 'app-setcreditlimit',
            templateUrl: './setCreditLimit.html'
        }),
        __metadata("design:paramtypes", [Router, RestService])
    ], SetCreditLimitComponent);
    return SetCreditLimitComponent;
}());
export { SetCreditLimitComponent };
//# sourceMappingURL=setCreditLimit.js.map