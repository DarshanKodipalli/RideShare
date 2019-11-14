import { async, TestBed } from '@angular/core/testing';
import { AdminUsersBuyerDetailComponent } from './admin-users-buyer-detail.component';
describe('AdminUsersBuyerDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AdminUsersBuyerDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AdminUsersBuyerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=admin-users-buyer-detail.component.spec.js.map