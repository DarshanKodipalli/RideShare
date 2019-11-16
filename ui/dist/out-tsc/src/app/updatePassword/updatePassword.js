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
var UpdatePasswordComponent = /** @class */ (function () {
    function UpdatePasswordComponent(route, http) {
        this.route = route;
        this.http = http;
        this.updatePassword = {};
    }
    UpdatePasswordComponent.prototype.ngOnInit = function () {
        console.log("Update Password");
        this.updatePassword.newPassword = "password";
        this.updatePassword.newMatchPassword = "password";
        var loginData = JSON.parse(localStorage.getItem("login"));
    };
    UpdatePasswordComponent.prototype.logout = function () {
        localStorage.clear();
        this.route.navigate(['login']);
    };
    UpdatePasswordComponent.prototype.updateUserPassword = function (updatePassword) {
        var _this = this;
        Swal({
            title: 'Change the Password?',
            text: 'This\'ll change the password !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Change',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                console.log(updatePassword);
                _this.http.updatePassword(updatePassword).subscribe(function (response) {
                    Swal('Password Updated', 'Please Login again to Continue', 'success').then(function (newResult) {
                        if (newResult.value) {
                            console.log(response);
                            localStorage.clear();
                            _this.route.navigate(["login"]);
                        }
                    });
                }, function (error) {
                    console.log(error);
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal('Cancelled', 'The Password isn\'t Changed', 'error');
            }
        });
    };
    UpdatePasswordComponent = __decorate([
        Component({
            selector: 'app-password-update',
            templateUrl: './updatePassword.html'
        }),
        __metadata("design:paramtypes", [Router, RestService])
    ], UpdatePasswordComponent);
    return UpdatePasswordComponent;
}());
export { UpdatePasswordComponent };
//# sourceMappingURL=updatePassword.js.map