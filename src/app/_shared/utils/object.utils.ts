import { isString, camelCase } from 'lodash';
import { DateUtils } from './date.utils';

export class ObjectUtils {
    static hasData(data: any): boolean {

        if (Array.isArray(data)) {
            return data.length > 0;
        }

        if (isString(data)) {
            return data.length > 0;
        }

        const isNotNullAndUndefined: boolean = data !== null && data !== undefined;
        return isNotNullAndUndefined;
    }

    static isEmpty(data: any): boolean {
        if (Array.isArray(data)) {
            return data.length === 0;
        }

        if (isString(data)) {
            return data.length === 0;
        }

        const isNullOrUndefined: boolean = data === null || data === undefined;
        return isNullOrUndefined;
    }

    static validParse(dataType: 'string' | 'number' | 'boolean' | 'date', value: string): boolean {
        if (ObjectUtils.isEmpty(value))
            return true;

        const trimmed = value.toString().trim();
        let result: boolean = false;

        switch (dataType) {
            case 'string':
                result = true;
                break;
            case 'number':
                const num = Number(trimmed);
                result = !isNaN(num) && isFinite(num);
                break;
            case 'boolean':
                const lower = trimmed.toLowerCase();
                result = ['true', 'false', '1', '0', 'yes', 'no'].includes(lower);
                break;
            case 'date':
                result = DateUtils.validParse(trimmed);
                break;
        }

        return result;
    }

    static parseToBoolean(value: any): boolean {
        if (typeof value === 'boolean') return value;

        if (typeof value === 'string') {
            const str = value.trim().toLowerCase();
            if (str === 'true' || str === '1') return true;
            if (str === 'false' || str === '0') return false;
            return null;
        }

        if (typeof value === 'number') {
            if (value === 1) return true;
            if (value === 0) return false;
            return null;
        }

        return null;
    }

    static getEnumList<T>(enumObj: T): T[keyof T][] {
        return Object.values(enumObj).filter(value => typeof value === 'number') as T[keyof T][];
    }

    static parseBackendJson<T>(json: string | null): T | null {
        if (!json) return null;

        try {
            const raw = JSON.parse(json);
            return ObjectUtils.toCamelCase(raw) as T;
        } catch (e) {
            throw new Error('Invalid JSON from backend:', e);
        }
    }

    static stringifyBackendJson(obj: any): string {
        return JSON.stringify(ObjectUtils.toPascalCaseObject(obj));
    }

    static toPascalCaseObject(inner: any): any {
        if (inner === null || typeof inner !== 'object') return inner;

        if (Array.isArray(inner)) {
            return inner.map(ObjectUtils.toPascalCaseObject);
        }

        return Object.keys(inner).reduce((result, key) => {
            const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
            result[pascalKey] = ObjectUtils.toPascalCaseObject(inner[key]);
            return result;
        }, {} as any);
    }

    private static toCamelCase(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(v => ObjectUtils.toCamelCase(v));
        } else if (obj !== null && obj.constructor === Object) {
            return Object.fromEntries(
                Object.entries(obj).map(([k, v]) => [camelCase(k), this.toCamelCase(v)])
            );
        }
        return obj;
    }
}
