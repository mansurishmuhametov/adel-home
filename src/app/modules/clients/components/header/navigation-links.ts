import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Одежда',
        routerLink: './products/category/clothes'
    },
    {
        name: 'Комплекты',
        routerLink: './products/category/beddingSet'
    }
];

export const navigationLinks = links;
