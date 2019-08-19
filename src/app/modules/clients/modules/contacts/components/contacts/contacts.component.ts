import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // angular удаляет все тэги <script>, который необходим для добавления яндекс карты
        // поэтому приходится добавлять этот тэг вручную
        this.initYmap();
    }

    public initYmap(): void {
        // tslint:disable-next-line:max-line-length
        const path = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6a86ea221e39da3ef61a24d8e6296c595c952f9e2dbdcd26b6bf3a6dea2d624b&amp;width=100%25&amp;height=500&amp;lang=ru_RU&amp;scroll=true';
        const type = 'text/javascript';
        const charset = 'utf-8';

        const ymap = document.getElementById('ymap');
        const ymapScript = document.createElement('script');

        ymapScript.src = path;
        ymapScript.type = type;
        ymapScript.charset = charset;

        ymap.appendChild(ymapScript);
    }
}
