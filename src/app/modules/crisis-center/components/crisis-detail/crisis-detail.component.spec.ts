import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisService } from '@app-modules/crisis-center/services/crisis.service';
import { DialogService } from '@app/modules/shared/services/dialog/dialog.service';
import { MessageService } from '@app/message.service';

describe('CrisisDetailComponent', () => {
    let component: CrisisDetailComponent;
    let fixture: ComponentFixture<CrisisDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([])
            ],
            declarations: [CrisisDetailComponent],
            providers: [
                CrisisService,
                MessageService,
                DialogService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrisisDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
