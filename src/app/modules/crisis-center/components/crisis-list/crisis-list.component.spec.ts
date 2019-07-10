import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CrisisListComponent } from './crisis-list.component';
import { CrisisService } from '@app/crisis-center/services/crisis.service';
import { MessageService } from '@app/message.service';

describe('CrisisListComponent', () => {
    let component: CrisisListComponent;
    let fixture: ComponentFixture<CrisisListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([])
            ],
            declarations: [CrisisListComponent],
            providers: [
                CrisisService,
                MessageService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrisisListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
