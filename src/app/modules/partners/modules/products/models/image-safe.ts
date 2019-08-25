import { SafeUrl } from '@angular/platform-browser';

export class ImageSafe {
    constructor(
        private readonly id: string,
        private readonly content: SafeUrl
    ) { }

    get Id(): string {
        return this.id;
    }

    get Content(): SafeUrl {
        return this.content;
    }
}
