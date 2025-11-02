import { DropdownItem } from "../models";
import { ObjectUtils } from "./object.utils";

export class ArrayUtils {
    static calculateAverage(values: Array<number>): number {
        if (ObjectUtils.isEmpty(values))
            return 0;

        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    static calculateSum(values: Array<number>): number {
        if (ObjectUtils.isEmpty(values))
            return 0;

        return values.reduce((a, b) => a + b, 0);
    }

    static compareEqualData(modelOne: unknown[], modelTwo: unknown[], excludedKeys: Array<string> = []): boolean {
        if (ObjectUtils.isEmpty(modelOne) && ObjectUtils.isEmpty(modelTwo)) {
            return true;
        }

        if (ObjectUtils.isEmpty(modelOne) || ObjectUtils.isEmpty(modelTwo)) {
            return false;
        }

        const keys: Array<string> = Object.keys(modelOne[0]).filter(k => !excludedKeys.includes(k));
        const result: boolean = keys.every(key => modelOne[key] === modelTwo[key]);
        return result;
    }
}
