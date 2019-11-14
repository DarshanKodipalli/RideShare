import { async, TestBed } from '@angular/core/testing';
import { InvoiceNewDetailComponent } from './invoice-new-detail.component';
describe('InvoiceNewDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [InvoiceNewDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(InvoiceNewDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=invoice-new-detail.component.spec.js.map