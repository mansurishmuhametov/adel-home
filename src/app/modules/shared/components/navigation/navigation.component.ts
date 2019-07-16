import { Component, OnInit, Input } from '@angular/core';

import { NavigationLink } from './navigation-link';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    @Input() links: NavigationLink[];

    constructor() { }

    public ngOnInit(): void { }
}
