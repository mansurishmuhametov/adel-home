import { Component, OnInit } from '@angular/core';

import { NavigationLink } from '@app-shared/components/navigation/navigation-link';
import { navigationLinks } from './navigation-links';

@Component({
    selector: 'app-admin-navigation',
    templateUrl: './admin-navigation.component.html',
    styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {
    links: NavigationLink[];

    constructor() { }

    ngOnInit() {
        this.links = navigationLinks;
    }

}
