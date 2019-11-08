var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderPageComponent } from './order-page/order-page.component';
import { InvoicePageComponent } from './invoice-page/invoice-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUsersBuyerDetailComponent } from './admin-users-buyer-detail/admin-users-buyer-detail.component';
import { AdminUsersSellerDetailComponent } from './admin-users-seller-detail/admin-users-seller-detail.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword';
import { UpdateProfileComponent } from './updateProfile/updateProfile';
import { SetCreditLimitComponent } from './setCreditLimit/setCreditLimit';
import { PaymentBuyerComponent } from "./paymentBuyer/paymentBuyer";
import { CreateInvoiceDirectlyComponent } from './createInvoiceDirectly/createInvoice';
import { SellerCheckerApproveInvoice } from './sellerCheckerApproveInvoice/sellerCheckerApproveInvoice';
import { InvoiceNewDetailComponent } from './invoice-new-detail/invoice-new-detail.component';
import { AuditorOrderComponent } from './auditorOrder/auditorOrder';
import { AuditorInvoiceComponent } from './auditorInvoice/orderInvoice';
import { AuditorPaymentComponent } from './auditorPayments/auditorPayment';
var routes = [
    { path: 'order', component: OrderPageComponent },
    { path: 'createorder', component: OrderPageComponent },
    { path: 'invoice', component: InvoicePageComponent },
    { path: 'createinvoice', component: InvoicePageComponent },
    { path: 'payment', component: PaymentPageComponent },
    { path: 'createpayment', component: PaymentPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'bulkupload', component: BulkuploadComponent },
    { path: 'users', component: AdminUsersPageComponent },
    { path: 'sellers', component: AdminUsersComponent },
    { path: 'createbuyer', component: AdminUsersBuyerDetailComponent },
    { path: 'createseller', component: AdminUsersSellerDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'passwordUpdate', component: UpdatePasswordComponent },
    { path: 'profileUpdate', component: UpdateProfileComponent },
    { path: 'setCreditLimit', component: SetCreditLimitComponent },
    { path: 'buyerpayment', component: PaymentBuyerComponent },
    { path: 'createInvoice', component: CreateInvoiceDirectlyComponent },
    { path: 'approveInvoice', component: SellerCheckerApproveInvoice },
    { path: 'detailapproveInvoice', component: InvoiceNewDetailComponent },
    { path: 'auditorOrder', component: AuditorOrderComponent },
    { path: 'auditorInvoice', component: AuditorInvoiceComponent },
    { path: 'auditorPayment', component: AuditorPaymentComponent },
    { path: '', component: LoginComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes),
                CommonModule
            ],
            exports: [RouterModule],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map