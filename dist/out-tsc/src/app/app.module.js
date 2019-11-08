var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule } from '@angular/material';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { OrderPageComponent } from './order-page/order-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { WeatherService } from './services/weather.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { InvoicePageComponent } from './invoice-page/invoice-page.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { RestService } from './services/rest.service';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminUsersBuyerDetailComponent } from './admin-users-buyer-detail/admin-users-buyer-detail.component';
import { AdminUsersSellerDetailComponent } from './admin-users-seller-detail/admin-users-seller-detail.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { InvoiceNewDetailComponent } from './invoice-new-detail/invoice-new-detail.component';
import { OrderNewDetailComponent } from './order-new-detail/order-new-detail.component';
import { PaymentNewDetailComponent } from './payment-new-detail/payment-new-detail.component';
import { SellerInvoiceFileUploadComponent } from './invoice-detail/fileUpload';
import { BankerInvoiceFileUploadComponent } from './payment-detail/fileUpload';
import { BulkUploadComponentOrders } from './bulkupload/bulkUploadComponent';
import { UpdatePasswordComponent } from './updatePassword/updatePassword';
import { UpdateProfileComponent } from './updateProfile/updateProfile';
import { SetCreditLimitComponent } from './setCreditLimit/setCreditLimit';
import { BankerReceiptFileUploadComponent } from './payment/receiptUpload';
import { PaymentBuyerComponent } from "./paymentBuyer/paymentBuyer";
import { CreateInvoiceDirectlyComponent } from './createInvoiceDirectly/createInvoice';
import { InvoiceUploadComponent } from './createInvoiceDirectly/invoiceUpload';
import { SellerCheckerApproveInvoice } from './sellerCheckerApproveInvoice/sellerCheckerApproveInvoice';
import { SellerInvoiceSignatureUploadComponent } from './invoice-new-detail/signatureUpload';
import { AuditorOrderComponent } from './auditorOrder/auditorOrder';
import { AuditorInvoiceComponent } from './auditorInvoice/orderInvoice';
import { AuditorPaymentComponent } from './auditorPayments/auditorPayment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                OrderComponent,
                OrderPageComponent,
                DashboardComponent,
                OrderDetailComponent,
                TimelineComponent,
                LoginComponent,
                HeaderComponent,
                NavComponent,
                InvoicePageComponent,
                InvoiceComponent,
                InvoiceDetailComponent,
                BulkuploadComponent,
                PaymentPageComponent,
                PaymentComponent,
                PaymentDetailComponent,
                AuthGuardComponent,
                UpdateProfileComponent,
                AdminUsersPageComponent,
                AdminUsersBuyerDetailComponent,
                AdminUsersSellerDetailComponent,
                AdminUsersComponent,
                InvoiceNewDetailComponent,
                OrderNewDetailComponent,
                SellerInvoiceFileUploadComponent,
                BankerInvoiceFileUploadComponent,
                BulkUploadComponentOrders,
                PaymentNewDetailComponent,
                BankerReceiptFileUploadComponent,
                SetCreditLimitComponent,
                PaymentBuyerComponent,
                CreateInvoiceDirectlyComponent,
                InvoiceUploadComponent,
                UpdatePasswordComponent,
                SellerCheckerApproveInvoice,
                SellerInvoiceSignatureUploadComponent,
                AuditorOrderComponent,
                AuditorInvoiceComponent,
                AuditorPaymentComponent
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                MatAutocompleteModule,
                MatBadgeModule,
                MatBottomSheetModule,
                MatButtonModule,
                MatButtonToggleModule,
                MatCardModule,
                MatCheckboxModule,
                MatChipsModule,
                MatDatepickerModule,
                MatDialogModule,
                MatDividerModule,
                MatExpansionModule,
                MatFormFieldModule,
                MatGridListModule,
                MatIconModule,
                MatInputModule,
                MatListModule,
                MatMenuModule,
                MatPaginatorModule,
                MatProgressBarModule,
                MatProgressSpinnerModule,
                MatRadioModule,
                MatRippleModule,
                MatSelectModule,
                MatSidenavModule,
                MatSlideToggleModule,
                MatSliderModule,
                MatSnackBarModule,
                MatSortModule,
                MatStepperModule,
                MatTableModule,
                MatTabsModule,
                MatToolbarModule,
                MatTooltipModule,
                MatTreeModule,
                FormsModule,
                ReactiveFormsModule,
                AppRoutingModule,
                HttpModule,
                MatNativeDateModule,
                Ng4LoadingSpinnerModule.forRoot()
            ],
            providers: [WeatherService, RestService, MatDatepickerModule],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map