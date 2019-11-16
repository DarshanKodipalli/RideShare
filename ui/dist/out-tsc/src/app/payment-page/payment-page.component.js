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
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AppComponent } from '../app.component';
import { isArray } from 'util';
var PaymentPageComponent = /** @class */ (function () {
    function PaymentPageComponent(route, app) {
        this.route = route;
        this.app = app;
        this.paymentNumber = "";
        this.currentTab = "";
        this.currentIndex = 0;
        this.changingValue = new Subject();
        this.tabs = ['Payment List'];
        this.selected = new FormControl(0);
    }
    PaymentPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.setLoggedIn();
            _this.app.show();
        }, 0);
        console.log(this.route.snapshot);
        var path;
        if (isArray(this.route.snapshot.url)) {
            path = this.route.snapshot.url[0]['path'];
        }
        else {
            path = this.route.snapshot.url['path'];
        }
        console.log(path);
        //console.log("snapshot url is "+this.route.snapshot+"-"+this.route.snapshot.url);
        if (path === 'createpayment') {
            this.currentTab = 'New Payment';
            this.addTab(null, 'new');
        }
        else if (path === 'payment') {
            this.paymentNumber = this.route.snapshot.queryParamMap.get('paymentNumber');
            if (this.paymentNumber) {
                this.addTab(this.paymentNumber, 'detail');
            }
        }
    };
    PaymentPageComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.hide();
        }, 0);
    };
    PaymentPageComponent.prototype.addTab = function (id, page) {
        this.paymentNumber = id;
        //console.log(this.tabs.indexOf('Payment Detail'));
        if (page == 'detail') {
            if (this.tabs.indexOf('Payment Detail') == -1) {
                this.tabs.push('Payment Detail');
            }
            this.currentTab = 'Payment Detail';
        }
        else if (page == 'new') {
            if (this.tabs.indexOf('New Payment') == -1) {
                this.tabs.push('New Payment');
            }
            this.currentTab = 'New Payment';
        }
        //console.log("current tab value is "+this.currentTab.valueOf());
        //console.log("Array index of"+this.tabs.indexOf(this.currentTab.valueOf()));
        this.selected.setValue(this.tabs.indexOf(this.currentTab.valueOf()));
    };
    PaymentPageComponent.prototype.removeTab = function () {
        console.log("Removing detail tab. pass index");
        this.tabs.splice(1, 1);
    };
    PaymentPageComponent.prototype.onLinkClick = function (event) {
        console.log('event => ', event);
        console.log('index => ', event.index);
        console.log('tab => ', event.tab);
        this.currentIndex = event.index;
        this.currentTab = event.tab.textLabel;
        if (event.index == 0) {
            this.changingValue.next(true);
            window.history.replaceState({}, '', "/payment");
            // reloadGrid();
        }
        else if (this.paymentNumber) {
            window.history.replaceState({}, '', "/payment?paymentNumber=" + this.paymentNumber);
        }
        else {
            window.history.replaceState({}, '', "/createpayment");
        }
    };
    PaymentPageComponent.prototype.getCurrentTab = function () {
        return this.currentTab;
    };
    PaymentPageComponent.prototype.getCurrentIndex = function () {
        return this.currentIndex;
    };
    PaymentPageComponent = __decorate([
        Component({
            selector: 'app-payment-page',
            templateUrl: './payment-page.component.html',
            styleUrls: ['./payment-page.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            AppComponent])
    ], PaymentPageComponent);
    return PaymentPageComponent;
}());
export { PaymentPageComponent };
//# sourceMappingURL=payment-page.component.js.map