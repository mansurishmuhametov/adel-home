import { Category } from './category';
import { ProductType } from './product-type';

export class Product {
    constructor(
        private readonly id: string,
        private readonly imageId: string,
        private readonly name: string,
        private readonly price: number,
        private readonly article: number,
        private readonly priority: number,
        private readonly type: ProductType,
        private readonly description: string,
        private readonly consist: string,
        private readonly count: number,
        private readonly images: string[] = []
    ) { }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Type(): ProductType {
        return this.type;
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

    get Consist(): string {
        return this.consist;
    }

    get ImageId(): string {
        return this.imageId;
    }

    get Priority(): number {
        return this.priority;
    }

    get Count(): number {
        return this.count;
    }

    get Images(): string[] {
        return this.images;
    }
}
