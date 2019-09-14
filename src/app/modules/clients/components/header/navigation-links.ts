import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Трикотаж для дома',
        routerLink: './products/category/clothes'
    },
    {
        name: 'Постельные комплекты',
        routerLink: './products/category/beddingSet'
    },
    {
        name: 'Полотенца',
        routerLink: './products/category/towel'
    },
    {
        name: 'Аксессуары',
        routerLink: './products/category/accessory'
    }
];

export const navigationLinks = links;
