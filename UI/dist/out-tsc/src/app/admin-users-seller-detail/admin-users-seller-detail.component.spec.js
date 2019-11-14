import { async, TestBed } from '@angular/core/testing';
import { AdminUsersSellerDetailComponent } from './admin-users-seller-detail.component';
describe('AdminUsersSellerDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AdminUsersSellerDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AdminUsersSellerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=admin-users-seller-detail.component.spec.js.map