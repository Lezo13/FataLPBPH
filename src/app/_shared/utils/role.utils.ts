import { RoleEnum } from "../enums";
import { UserRole } from "../models";

export class RoleUtils {
    static getMaxRole(roles: number[]): number {
        const roleOrders = [
            RoleEnum.Admin,
            RoleEnum.Moderator,
            RoleEnum.Staff
        ];

        const indices = roles.map(role => roleOrders.indexOf(role));
        const maxIndex = Math.min(...indices);
        const maxRole = maxIndex >= 0 ? roles[indices.indexOf(maxIndex)] : null;

        return maxRole;
    }
}
