import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Комплекты',
        routerLink: './products/category/beddingSet'
    },
    {
        name: 'Одежда',
        routerLink: './products/category/clothes'
    }
];

export const navigationLinks = links;
