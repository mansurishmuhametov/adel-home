import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-title',
    templateUrl: './header-title.component.html',
    styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {

    constructor(
        private readonly router: Router
    ) { }

    ngOnInit() {
    }

    public goTo(state): void {
        this.router.navigate([`clients/${state}`]);
    }
}
