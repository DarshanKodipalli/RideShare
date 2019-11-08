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
var AuthGuardComponent = /** @class */ (function () {
    function AuthGuardComponent(router) {
        this.router = router;
    }
    AuthGuardComponent.prototype.ngOnInit = function () {
    };
    AuthGuardComponent.prototype.canActivate = function (route) {
        if (localStorage.getItem('login')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuardComponent = __decorate([
        Component({
            selector: 'app-auth-guard',
            templateUrl: './auth-guard.component.html',
            styleUrls: ['./auth-guard.component.scss']
        }),
        __metadata("design:paramtypes", [Router])
    ], AuthGuardComponent);
    return AuthGuardComponent;
}());
export { AuthGuardComponent };
//# sourceMappingURL=auth-guard.component.js.map