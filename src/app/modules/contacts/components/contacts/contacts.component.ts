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
        const path = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A54f017e980ca454f5661b2b5f2a39f29475e6239ad47fb755580427e34ad8a44&amp;width=1110&amp;height=610&amp;lang=ru_RU&amp;scroll=true';
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
