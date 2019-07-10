import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CrisisDetailResolveService } from './crisis-detail-resolve.service';
import { CrisisService } from '@app-modules/crisis-center/services/crisis.service';
import { MessageService } from '@app/message.service';

describe('CrisisDetailResolveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CrisisDetailResolveService,
                CrisisService,
                MessageService
            ]
        });
    });

    it('should be created', inject([CrisisDetailResolveService], (service: CrisisDetailResolveService) => {
        expect(service).toBeTruthy();
    }));
});
