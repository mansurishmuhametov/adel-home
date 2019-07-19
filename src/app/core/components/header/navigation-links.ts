import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Комплекты',
        routerLink: 'products/beddingsets',
        order: 0
    },
    {
        name: 'Одеяло',
        routerLink: 'products/blankets',
        order: 1
    },
    {
        name: 'Подушки',
        routerLink: 'products/pillows',
        order: 2
    },
    {
        name: 'Полотенца',
        routerLink: 'products/towels',
        order: 3
    },
    {
        name: 'Одежда',
        routerLink: 'products/clothes',
        order: 4
    }
];

export const navigationLinks = links;
