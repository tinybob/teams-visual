import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Home',
        icon: 'home-outline',
        link: '/pages/guild',
        home: true
    },
    {
        title: 'My Teams',
        icon: 'grid-outline',
        link: '/pages/team',
        home: true
    },
    {
        title: 'All Teams',
        icon: 'keypad-outline',
        link: '/pages/home',
        home: true
    },
    {
        title: 'Calendar',
        icon: 'calendar-outline',
        link: '/pages/calendar',
        home: true
    },
    {
        title: 'Tutorial',
        icon: 'question-mark-circle-outline',
        link: '/tutorial',
        home: true
    }
];