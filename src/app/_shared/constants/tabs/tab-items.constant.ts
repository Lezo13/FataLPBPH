import { RoleEnum } from '../../enums';
import { NavItem } from '../../models';

export const ADMIN_TOPNAV_ITEMS: NavItem[] = [
    {
        order: 0,
        name: 'PLAYERS',
        value: 'players',
        url: 'admin/players',
        logo: '',
        allowedRoles: [RoleEnum.Admin]
    },
     {
        order: 1,
        name: 'MATCHES',
        value: 'matches',
        url: 'admin/matches',
        logo: '',
        allowedRoles: [RoleEnum.Admin, RoleEnum.Moderator]
    }
];


export const CLIENT_TOPNAV_ITEMS: NavItem[] = [
    {
        order: 0,
        name: 'HOME',
        value: 'home',
        url: 'home',
        logo: ''
    },
    {
        order: 1,
        name: 'TEAM',
        value: 'team',
        url: 'team',
        logo: ''
    }
];