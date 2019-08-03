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
        const path = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ac6e5d80ee04be1b5f5aae7d8f934f929f95123b4dd583fc95a6a41b14e5b4184&amp;width=1110&amp;height=610&amp;lang=ru_RU&amp;scroll=true';
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
