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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
var AdminUsersBuyerDetailComponent = /** @class */ (function () {
    function AdminUsersBuyerDetailComponent(http, rout) {
        this.http = http;
        this.rout = rout;
        this.signupData = {};
        this.signupData.role = "Buyer";
    }
    AdminUsersBuyerDetailComponent.prototype.ngOnInit = function () {
    };
    AdminUsersBuyerDetailComponent.prototype.addUser = function (signUpData) {
        var _this = this;
        Swal({
            title: 'Create a User?',
            text: 'This\'ll create an user!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                signUpData.role = signUpData.role.toLowerCase();
                _this.http.SignUp(signUpData).subscribe(function (response) {
                    console.log(response);
                    _this.rout.navigate(['/users']);
                }, function (error) {
                    console.log(error);
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal('Cancelled', 'A User is not created', 'error');
            }
        });
    };
    AdminUsersBuyerDetailComponent = __decorate([
        Component({
            selector: 'app-admin-users-buyer-detail',
            templateUrl: './admin-users-buyer-detail.component.html',
            styleUrls: ['./admin-users-buyer-detail.component.scss']
        }),
        __metadata("design:paramtypes", [RestService, Router])
    ], AdminUsersBuyerDetailComponent);
    return AdminUsersBuyerDetailComponent;
}());
export { AdminUsersBuyerDetailComponent };
//# sourceMappingURL=admin-users-buyer-detail.component.js.map