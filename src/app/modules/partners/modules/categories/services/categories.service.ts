import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WebApiService } from '@app/core/modules/web-api/services/web-api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(
        private readonly webApiService: WebApiService
    ) { }

    public getAll(): Observable<any> {
        return this.webApiService.get('/categories');
    }
}
