import { Category } from './category';

export class ProductFilter {
    constructor(
        private readonly category: Category
    ) { }

    get Category(): Category {
        return this.category;
    }
}
