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
var OrderPageComponent = /** @class */ (function () {
    function OrderPageComponent(route, app) {
        this.route = route;
        this.app = app;
        this.orderNumber = "";
        this.currentTab = "";
        this.currentIndex = 0;
        this.changingValue = new Subject();
        this.tabs = ['Order List'];
        this.selected = new FormControl(0);
    }
    OrderPageComponent.prototype.ngOnInit = function () {
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
        if (path === 'createorder') {
            this.currentTab = 'New Order';
            this.addTab(null, 'new');
        }
        else if (path === 'order') {
            this.orderNumber = this.route.snapshot.queryParamMap.get('orderNumber');
            if (this.orderNumber) {
                this.addTab(this.orderNumber, 'detail');
            }
        }
    };
    OrderPageComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.app.hide();
        }, 0);
    };
    OrderPageComponent.prototype.addTab = function (id, page) {
        this.orderNumber = id;
        //console.log(this.tabs.indexOf('Order Detail'));
        if (page == 'detail') {
            if (this.tabs.indexOf('Order Detail') == -1) {
                this.tabs.push('Order Detail');
            }
            this.currentTab = 'Order Detail';
        }
        else if (page == 'new') {
            if (this.tabs.indexOf('New Order') == -1) {
                this.tabs.push('New Order');
            }
            this.currentTab = 'New Order';
        }
        //console.log("current tab value is "+this.currentTab.valueOf());
        //console.log("Array index of"+this.tabs.indexOf(this.currentTab.valueOf()));
        this.selected.setValue(this.tabs.indexOf(this.currentTab.valueOf()));
    };
    OrderPageComponent.prototype.removeTab = function () {
        console.log("Removing detail tab. pass index");
        this.tabs.splice(1, 1);
    };
    OrderPageComponent.prototype.onLinkClick = function (event) {
        console.log('event => ', event);
        console.log('index => ', event.index);
        console.log('tab => ', event.tab);
        this.currentIndex = event.index;
        this.currentTab = event.tab.textLabel;
        if (event.index == 0) {
            //window.history.pushState({},'',`/order`);
            this.changingValue.next(true);
            window.history.replaceState({}, '', "/order");
            // reloadGrid();
        }
        else if (this.orderNumber) {
            //window.history.pushState({},'',`/order?orderNumber=`+this.orderNumber);
            window.history.replaceState({}, '', "/order?orderNumber=" + this.orderNumber);
        }
        else {
            window.history.replaceState({}, '', "/createorder");
        }
        //this.router.navigate(['contacts']); 
    };
    OrderPageComponent.prototype.getCurrentTab = function () {
        return this.currentTab;
    };
    OrderPageComponent.prototype.getCurrentIndex = function () {
        return this.currentIndex;
    };
    OrderPageComponent = __decorate([
        Component({
            selector: 'app-order-page',
            templateUrl: './order-page.component.html',
            styleUrls: ['./order-page.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            AppComponent])
    ], OrderPageComponent);
    return OrderPageComponent;
}());
export { OrderPageComponent };
//# sourceMappingURL=order-page.component.js.map