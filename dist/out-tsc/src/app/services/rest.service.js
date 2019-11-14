var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
var RestService = /** @class */ (function () {
    function RestService(http) {
        this.http = http;
        this.loginData = {};
        this.fileTemp = {};
        this.invoice = {};
        this.payment = {};
        this.fileTempOrder = {};
        this.receipt = {};
        this.directInvoice = {};
        this.signature = {};
        this.loginData = localStorage.getItem("login");
    }
    RestService.prototype.setFileTempInvoice = function (arg) {
        this.fileTemp = arg;
    };
    RestService.prototype.setFileTemp = function (arg) {
        this.fileTempOrder = arg;
    };
    RestService.prototype.getFileTemp = function () {
        return this.fileTempOrder;
    };
    RestService.prototype.setSignatureTemp = function (arg) {
        this.signature = arg;
    };
    RestService.prototype.getSignatureTemp = function () {
        return this.signature;
    };
    RestService.prototype.setDirectInvoiceTemp = function (arg) {
        this.directInvoice = arg;
    };
    RestService.prototype.getDirectInvoiceTemp = function () {
        return this.directInvoice;
    };
    RestService.prototype.setReceiptTemp = function (arg) {
        this.receipt = arg;
    };
    RestService.prototype.getReceiptTemp = function () {
        return this.receipt;
    };
    RestService.prototype.getInvoiceFile = function () {
        return this.fileTemp;
    };
    RestService.prototype.setInvoice = function (arg) {
        this.invoice = arg;
    };
    RestService.prototype.getInvoice = function () {
        return this.invoice;
    };
    RestService.prototype.setPayment = function (arg) {
        this.payment = arg;
    };
    RestService.prototype.getPayment = function () {
        return this.payment;
    };
    RestService.prototype.getAllUsers = function () {
        return this.http.get("http://localhost:3000/api/v1/users", { withCredentials: true });
    };
    RestService.prototype.SignUp = function (signUpData) {
        return this.http.post("http://localhost:3000/api/v1/signup", signUpData, { withCredentials: true });
    };
    RestService.prototype.refreshFeed = function () {
        return this.http.get("http://localhost:3000/api/v1/carts/bulk", { withCredentials: true });
    };
    RestService.prototype.viewInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/view/invoice", data, { withCredentials: true, responseType: ResponseContentType.Blob });
    };
    RestService.prototype.viewSignedInvoiceFromChecked = function (data) {
        return this.http.post("http://localhost:3000/api/v1/view/invoicesignedinvoice", data, { withCredentials: true, responseType: ResponseContentType.Blob });
    };
    RestService.prototype.viewPayment = function (data) {
        return this.http.post("http://localhost:3000/api/v1/view/payment", data, { withCredentials: true, responseType: ResponseContentType.Blob });
    };
    RestService.prototype.viewPaymentBuyer = function (data) {
        return this.http.post("http://localhost:3000/api/v1/view/buyerpayment", data, { withCredentials: true, responseType: ResponseContentType.Blob });
    };
    RestService.prototype.getPaymentsMade = function () {
        return this.http.get("http://localhost:3000/api/v1/payments", { withCredentials: true });
    };
    RestService.prototype.getTransactionOrderDetails = function (data) {
        console.log(data);
        var URL = "http://localhost:3000/api/v1/transactions/assets/" + data;
        console.log(URL);
        return this.http.get(URL, { withCredentials: true });
    };
    RestService.prototype.searchOrders = function (data) {
        return this.http.post("http://localhost:3000/api/v1/searchOrders", data, { withCredentials: true });
    };
    RestService.prototype.searchInvoices = function (data) {
        return this.http.post("http://localhost:3000/api/v1/searchInvoices", data, { withCredentials: true });
    };
    RestService.prototype.searchPayments = function (data) {
        return this.http.post("http://localhost:3000/api/v1/searchPayments", data, { withCredentials: true });
    };
    RestService.prototype.getTransactionInvoiceDetails = function (data) {
        var URL = "http://localhost:3000/api/v1/transactions/assets/" + data;
        console.log(URL);
        return this.http.get(URL, { withCredentials: true });
    };
    RestService.prototype.getTransactionPaymentDetails = function (data) {
        var URL = "http://localhost:3000/api/v1/transactions/assets/" + data;
        console.log(URL);
        return this.http.get(URL, { withCredentials: true });
    };
    RestService.prototype.getSpecificTransactionDetail = function (data) {
        return this.http.get("http://localhost:3000/api/v1/transactions/" + data.transactionId + "?action=" + data.action, { withCredentials: true });
    };
    RestService.prototype.signIn = function (data) {
        return this.http.post("http://localhost:3000/api/v1/login", data, { withCredentials: true });
    };
    RestService.prototype.signUp = function (data) {
        return this.http.post("http://localhost:3000/api/v1/signup", data);
    };
    RestService.prototype.getUsers = function () {
        return this.http.get("http://localhost:3000/api/v1/users", { withCredentials: true });
    };
    RestService.prototype.updatePassword = function (data) {
        return this.http.post("http://localhost:3000/api/v1/users/me/password", data, { withCredentials: true });
    };
    RestService.prototype.updateProfile = function (data) {
        return this.http.put("http://localhost:3000/api/v1/users/me", data, { withCredentials: true });
    };
    RestService.prototype.updateKyc = function (data) {
        return this.http.post("http://localhost:3000/api/v1/users/me/kyc", data, { withCredentials: true });
    };
    RestService.prototype.placeOrder = function (data) {
        console.log(data);
        return this.http.post("http://localhost:3000/api/v1/orders", data, { withCredentials: true });
    };
    RestService.prototype.makePayment = function (data) {
        return this.http.post("http://localhost:3000/api/v1/payments", data, { withCredentials: true });
    };
    RestService.prototype.setCreditLimit = function (data) {
        return this.http.post("http://localhost:3000/api/v1/users/approve/" + data.email, data, { withCredentials: true });
    };
    RestService.prototype.getAllOrders = function () {
        return this.http.get("http://localhost:3000/api/v1/orders", { withCredentials: true });
    };
    RestService.prototype.getOrders = function () {
        return this.http.get("http://www.mocky.io/v2/5c0cb9f42f00007e00e2e494?mocky-delay=3000ms");
    };
    RestService.prototype.getOrderById = function (data) {
        return this.http.post("http://localhost:3000/api/v1/getOrder/details", data, { withCredentials: true });
    };
    RestService.prototype.addAsset = function (po) {
        return this.http.post("http://localhost:3000/api/v1/orders/carts", po, { withCredentials: true });
    };
    RestService.prototype.createOrder = function (data) {
        return this.http.post("http://localhost:3000/api/v1/orders/carts", data, { withCredentials: true });
    };
    RestService.prototype.submitOrder = function (data) {
        return this.http.post("http://localhost:3000/api/v1/orders", data, { withCredentials: true });
    };
    RestService.prototype.approveOrder = function (data) {
        return this.http.post("http://localhost:3000/api/v1/orders/" + data.orderNumber + "/approve", data, { withCredentials: true });
    };
    RestService.prototype.getInvoices = function () {
        return this.http.get("http://localhost:3000/api/v1/invoices/carts", { withCredentials: true });
    };
    RestService.prototype.getToBeApprovedInvoices = function () {
        return this.http.get("http://localhost:3000/api/v1/invoices", { withCredentials: true });
    };
    RestService.prototype.getInvoiceById = function () {
    };
    RestService.prototype.sendInvoice = function (data) {
        console.log("sendInvoice");
        return this.http.post("http://localhost:3000/api/v1/invoices", data, { withCredentials: true });
    };
    RestService.prototype.createInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices/carts", data, { withCredentials: true });
    };
    RestService.prototype.submitInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices", data, { withCredentials: true });
    };
    RestService.prototype.proposeInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices/" + data.id + "/propose", data, { withCredentials: true });
    };
    RestService.prototype.approveInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices/" + data.id + "/approve", data, { withCredentials: true });
    };
    RestService.prototype.checkerApproveInvoice = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices/" + data.id + "/approvechecker", data, { withCredentials: true });
    };
    RestService.prototype.getPayments = function () {
        return this.http.get("http://localhost:3000/api/v1/payments", { withCredentials: true });
    };
    RestService.prototype.createPayment = function (data) {
        return this.http.post("http://localhost:3000/api/v1/payments", data, { withCredentials: true });
    };
    RestService.prototype.approvePayment = function (data) {
        return this.http.post("http://localhost:3000/api/v1/payments/" + data.paymentNumber + "/approve", data, { withCredentials: true });
    };
    RestService.prototype.approveBankerPayment = function (data) {
        return this.http.post("http://localhost:3000/api/v1/invoices/" + data.invoiceNumber + "/acceptproposal", data, { withCredentials: true });
    };
    RestService.prototype.getTransactions = function () {
    };
    RestService.prototype.getTransactionsByOrderNumber = function () {
    };
    RestService.prototype.getTransactionDetail = function () {
    };
    RestService.prototype.bulkUploadOrders = function (data) {
        return this.http.post("http://localhost:3000/api/v1/carts/bulk", data, { withCredentials: true });
    };
    RestService.prototype.bulkUploadInvoices = function (data) {
        return this.http.post("http://localhost:3000/api/v1/carts/bulk", data, { withCredentials: true });
    };
    /*
     * Notification Services
     */
    // Fetches only unread messages to show in notification bar
    RestService.prototype.getUnreadNotifications = function () {
    };
    // Fetches all notifications
    RestService.prototype.getNotifications = function () {
    };
    /*
     * Reporting Services
     */
    RestService.prototype.exportInvoices = function () {
    };
    RestService.prototype.exportInvoiceById = function () {
    };
    RestService.prototype.exportOrderById = function () {
    };
    RestService.prototype.exportOrders = function () {
    };
    RestService.prototype.getBuyerSellerStats = function () {
    };
    RestService.prototype.getInvoiceStats = function () {
    };
    RestService.prototype.getOrderStats = function () {
    };
    RestService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], RestService);
    return RestService;
}());
export { RestService };
//# sourceMappingURL=rest.service.js.map