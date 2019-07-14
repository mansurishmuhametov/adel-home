import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Постель',
        routerLink: '/crises',
        order: 0
    },
    {
        name: 'Одеяло',
        routerLink: '/heroes',
        order: 1
    },
    {
        name: 'Подушки',
        routerLink: '/crisis-center',
        order: 2
    },
    {
        name: 'Полотенца',
        routerLink: '/admin',
        order: 3
    },
    {
        name: 'Одежда',
        routerLink: '/heroes',
        order: 4
    }
];

export const navigationLinks = links;
