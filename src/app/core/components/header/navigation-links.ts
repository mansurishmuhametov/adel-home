import { NavigationLink } from './navigation-link';

const links: NavigationLink[] = [
    {
        name: 'Комплекты',
        routerLink: 'products/beddingSet'
    },
    {
        name: 'Одежда',
        routerLink: 'products/clothes'
    }
    // ,
    // {
    //     name: 'Одеяло',
    //     routerLink: 'products/blankets'
    // },
    // {
    //     name: 'Подушки',
    //     routerLink: 'products/pillows'
    // },
    // {
    //     name: 'Полотенца',
    //     routerLink: 'products/towels'
    // }
];

export const navigationLinks = links;
