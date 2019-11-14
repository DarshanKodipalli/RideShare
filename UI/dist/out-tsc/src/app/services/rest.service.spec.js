import { TestBed, inject } from '@angular/core/testing';
import { RestService } from './rest.service';
describe('RestService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [RestService]
        });
    });
    it('should be created', inject([RestService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=rest.service.spec.js.map