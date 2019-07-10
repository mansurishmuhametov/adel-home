import { Component, OnInit } from '@angular/core';

import { NavigationLink } from './navigation-link';
import { navigationLinks } from './navigation-links';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    links: NavigationLink[];

    constructor() { }

    ngOnInit() {
        this.links = navigationLinks;
    }
}
