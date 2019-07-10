import { Component, OnInit, Input } from '@angular/core';

import { NavigationLink } from './navigation-link';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    @Input() links: NavigationLink[];

    constructor() { }

    ngOnInit() {}
}
