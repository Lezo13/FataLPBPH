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
    },
    {
        order: 2,
        name: 'SPAWN POINTS',
        value: 'spawnPoints',
        url: 'admin/spawn-points',
        logo: '',
        allowedRoles: [RoleEnum.Admin, RoleEnum.Moderator]
    },
    {
        order: 3,
        name: 'MAPS',
        value: 'maps',
        url: 'admin/maps',
        logo: '',
        allowedRoles: [RoleEnum.Admin, RoleEnum.Moderator]
    },
    {
        order: 4,
        name: 'INVITATIONS',
        value: 'invitations',
        url: 'admin/invitations',
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
    },
    {
        order: 2,
        name: 'MATCHES',
        value: 'matches',
        url: 'matches',
        logo: ''
    },
    {
        order: 2,
        name: 'SPAWN POINTS',
        value: 'spawnPoints',
        url: 'spawn-points',
        logo: ''
    }
];