import { RoleEnum } from "../enums";

export interface NavGroup {
  order?: number;
  name?: string;
  items?: NavItem[];
}

export interface NavItem {
  order?: number;
  name?: string;
  value?: string;
  logo?: string;
  url?: string;
  imgPath?: string;
  disabled?: boolean;
  allowedRoles?: RoleEnum[];
}
