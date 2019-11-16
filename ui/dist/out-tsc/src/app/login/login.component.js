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
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(app, _service, router) {
        this.app = app;
        this._service = _service;
        this.router = router;
        this.error = "";
        this.loginData = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginData.email = "buyer1@aeries.io";
        this.loginData.password = "password";
        setTimeout(function () {
            _this.app.removeLoggedIn();
        }, 0);
    };
    LoginComponent.prototype.login = function (data) {
        var _this = this;
        this.error = "";
        this.app.show();
        this._service.signIn(data)
            .subscribe(function (res) {
            if (res) {
                var loginData = {};
                loginData = res.json();
                console.log(res.json());
                // roles seller, buyer and banker
                //var data = {"id":"1234","role":"banker"};
                localStorage.setItem("login", JSON.stringify(loginData.data));
                _this.router.navigate(['/dashboard']);
            }
        }, function (error) {
            _this.error = "Email or password is wrong";
            console.log("Error:" + error);
            console.log("Display error message in user form");
            _this.app.hide();
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [AppComponent,
            RestService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map