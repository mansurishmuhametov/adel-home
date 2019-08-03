import { Category } from './category';

export class Product {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly category: Category,
        private readonly price: number,
        private readonly description: string,
        private readonly isInStock: boolean,
        private readonly imageId: boolean
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

    get Description(): string {
        return this.description;
    }

    get IsInStock(): boolean {
        return this.isInStock;
    }

    get ImageId(): boolean {
        return this.imageId;
    }
}
