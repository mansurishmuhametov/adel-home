import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Crisis Center',
        routerLink: '/crises',
        order: 0
    },
    {
        name: 'Heroes',
        routerLink: '/heroes',
        order: 1
    },
    {
        name: 'My crisis center',
        routerLink: '/crisis-center',
        order: 2
    },
    {
        name: 'Admin',
        routerLink: '/admin',
        order: 3
    }
];

export const navigationLinks = links;
