import { RoleEnum } from "../enums";


export const ROLE_NAMES: Record<RoleEnum, string> = {
  [RoleEnum.Admin]: 'Admin',
  [RoleEnum.Moderator]: 'Moderator',
  [RoleEnum.Staff]: 'Staff',
    [RoleEnum.Player]: 'Player'
};
