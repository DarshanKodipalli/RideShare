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
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var UpdateProfileComponent = /** @class */ (function () {
    function UpdateProfileComponent(route, http, spinner) {
        this.route = route;
        this.http = http;
        this.spinner = spinner;
        this.updateUser = {};
    }
    UpdateProfileComponent.prototype.ngOnInit = function () {
        console.log("Update Profile");
        var loginData = JSON.parse(localStorage.getItem("login"));
        this.updateUser.email = loginData.email;
        this.updateUser.username = loginData.username;
        console.log(loginData);
    };
    UpdateProfileComponent.prototype.logout = function () {
        localStorage.clear();
        this.route.navigate(['login']);
    };
    UpdateProfileComponent.prototype.updateUserProfile = function (updateUser) {
        var _this = this;
        Swal({
            title: 'Update the User Profile?',
            text: 'This\'ll update the User profile !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel'
        }).then(function (result) {
            if (result.value) {
                console.log(updateUser);
                _this.spinner.show();
                _this.http.updateProfile(updateUser).subscribe(function (response) {
                    _this.spinner.hide();
                    Swal('Profile Updated', 'Transaction Hash: ' + response.json().transactionHash + '', 'success').then(function (newResult) {
                        if (newResult.value) {
                            console.log(response);
                            _this.route.navigate(['dashboard']);
                        }
                    });
                }, function (error) {
                    console.log(error);
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal('Cancelled', 'A Profile isn\'t Updated', 'error');
            }
        });
    };
    UpdateProfileComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './updateProfile.html'
        }),
        __metadata("design:paramtypes", [Router, RestService, Ng4LoadingSpinnerService])
    ], UpdateProfileComponent);
    return UpdateProfileComponent;
}());
export { UpdateProfileComponent };
//# sourceMappingURL=updateProfile.js.map