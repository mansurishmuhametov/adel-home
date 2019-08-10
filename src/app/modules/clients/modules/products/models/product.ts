import { Category } from './category';
import { ProductType } from './product-type';

export class Product {
    constructor(
        private readonly id: string,
        private readonly image: string,
        private readonly name: string,
        private readonly price: number,
        private readonly priority: number,
        private readonly type: ProductType,
        private readonly description: string,
        private readonly count: number
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

    get Description(): string {
        return this.description;
    }

    get Image(): string {
        return this.image;
    }

    get Priority(): number {
        return this.priority;
    }

    get Count(): number {
        return this.count;
    }
}