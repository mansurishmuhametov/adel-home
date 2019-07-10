import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-crisis-center',
    templateUrl: './crisis-center.component.html',
    styleUrls: ['./crisis-center.component.css']
})
export class CrisisCenterComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    openMessage() {
        const routeConfig = {
            outlets: {
                content: ['message']
            },
            relativeTo: this.route
        };

        // todo: относительный путь не работает ('./home')
        // возможно из-за lazy loading данного модуля
        this.router.navigate(['crisis-center/home', routeConfig]);
    }

    closeMessage() {
        this.router.navigate(['crisis-center/home', { outlets: { content: null } }]);
    }
}
