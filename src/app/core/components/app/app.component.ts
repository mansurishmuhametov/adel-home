import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slideInAnimation } from '@app/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ slideInAnimation ]
})
export class AppComponent {
    title = 'app';

    getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
