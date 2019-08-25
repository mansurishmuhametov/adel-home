export class Image {
    constructor(
        private readonly id: string,
        private readonly content: string
    ) { }

    get Id(): string {
        return this.id;
    }

    get Content(): string {
        return this.content;
    }
}
