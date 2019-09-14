import { Category } from './category';

export class Product {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly price: number,
        private readonly article: number,
        private readonly priority: number,
        private readonly category: Category,
        private readonly description: string,
        private readonly count: number,
        private readonly consist: string,
        private readonly images: string[]
    ) { }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Category(): Category {
        return this.category;
    }

    get Price(): number {
        return this.price;
    }

    get Article(): number {
        return this.article;
    }

    get Description(): string {
        return this.description;
    }

    get Priority(): number {
        return this.priority;
    }

    get Count(): number {
        return this.count;
    }

    get Consist(): string {
        return this.consist;
    }

    get Images(): string[] {
        return this.images;
    }
}
