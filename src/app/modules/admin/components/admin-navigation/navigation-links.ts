import { NavigationLink } from '@app-shared/components/navigation/navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Dashboard',
        routerLink: './dashboard',
        order: 0
    },
    {
        name: 'Manage Crises',
        routerLink: './crises',
        order: 1
    },
    {
        name: 'Manage Heroes',
        routerLink: './heroes',
        order: 2
    }
];

export const navigationLinks = links;
