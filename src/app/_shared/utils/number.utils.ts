import { StringUtils } from "./string.utils";

export class NumberUtils {
  static createIndices(count: number): number[] {
    const indices: number[] = [];
    for (let i = 0; i < count; i++) {
      indices.push(i);
    }
    return indices;
  }

  static getPercentage(value: number, total: number): number {
    const defaultdecimal: number = 2;
    const quotient: number = this.safeDivision(value, total);
    const percentage: number = quotient * 100;
    const formatted: string = StringUtils.formatDecimalPlaces(percentage, 0, defaultdecimal);
    return +(formatted);
  }

  static safeDivision(dividend: number, divisor: number): number {
    const result: number = dividend / divisor;
    return isNaN(result) ? 0 : result;
  }

  static generateYears(startYear: number, endYear: number): number[] {
    const generatedYears: number[] = [];

    for (let year: number = startYear; year <= endYear; year++) {
      generatedYears.push(year);
    }

    return generatedYears;
  }

  static getMonthName(month: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month] ?? "";
  }
}
