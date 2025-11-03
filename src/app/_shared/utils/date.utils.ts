import { Timestamp } from "@angular/fire/firestore";
import { Month } from "../models";
import { ObjectUtils } from "./object.utils";
import { parse, isValid, isMatch } from 'date-fns';

export class DateUtils {
    static formatDate(input: Date): string {
        if (ObjectUtils.isEmpty(input))
            return '';

        const date = new Date(input);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
        const day = String(date.getDate()).padStart(2, '0');

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

        return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    }

    static formatShortDate(input: Date): string {
        const date = new Date(input);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short', // 'Dec'
            day: '2-digit', // '08'
            year: 'numeric' // '2025'
        };
        const formatted = date.toLocaleDateString('en-US', options).replace(/,/g, '');
        return formatted;
    }

    static formatTime(date: Date): string {
        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(date);
        return formattedTime;
    }

    static matchDate(input1: Date, input2: Date) {
        const date1: Date = new Date(input1);
        const date2: Date = new Date(input2);

        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    static getShortYear(input: Date): string {
        const date = new Date(input);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format");
        }

        const fullYear = date.getFullYear();
        const shortYear = (fullYear % 100).toString().padStart(2, '0');

        return shortYear;
    }

    static getDuration(startObj: Date, endObj: Date): string {
        if (ObjectUtils.isEmpty(startObj) || ObjectUtils.isEmpty(endObj))
            return '0 seconds';

        const start: Date = new Date(startObj);
        const end: Date = new Date(endObj);
        const diffInMs = end.getTime() - start.getTime();

        const hours = Math.floor(diffInMs / 3600000);
        const minutes = Math.floor((diffInMs % 3600000) / 60000);
        const seconds = Math.floor((diffInMs % 60000) / 1000);
        const milliseconds = diffInMs % 1000;

        if (hours > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds} second${seconds !== 1 ? 's' : ''}`;
        } else {
            const parts: string[] = [];
            if (seconds > 0) {
                parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
            }
            if (milliseconds > 0) {
                parts.push(`${milliseconds} millisecond${milliseconds !== 1 ? 's' : ''}`);
            }
            return parts.join(', ');
        }
    }


    static parseDate(dateString: string): Date {
        let parsedDate: Date = null;

        const formats: string[] = [
            'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd',
            'MMM dd, yyyy', 'dd MMM yyyy', 'MMMM dd, yyyy',
            'dd MMMM yyyy', 'MM-dd-yyyy', 'dd-MM-yyyy',
            'yyyy/MM/dd', 'dd/MMM/yyyy', 'MMM-dd-yyyy',
            'EEE, MMM dd yyyy', 'EEEE, MMMM dd yyyy', 'yyyy.MM.dd',
            'dd.MM.yyyy', 'MMM yyyy', 'MMMM yyyy'
        ];

        const matchedFormat: string = formats.find(f => isMatch(dateString, f));
        if (ObjectUtils.hasData(matchedFormat)) {
            const dateObj = parse(dateString, matchedFormat, new Date());
            parsedDate = isValid(dateObj) ? dateObj : null;
        }

        return parsedDate;
    }

    static validParse(dateString: string): boolean {
        let valid: boolean = false;

        const formats: string[] = [
            'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd',
            'MMM dd, yyyy', 'dd MMM yyyy', 'MMMM dd, yyyy',
            'dd MMMM yyyy', 'MM-dd-yyyy', 'dd-MM-yyyy',
            'yyyy/MM/dd', 'dd/MMM/yyyy', 'MMM-dd-yyyy',
            'EEE, MMM dd yyyy', 'EEEE, MMMM dd yyyy', 'yyyy.MM.dd',
            'dd.MM.yyyy', 'MMM yyyy', 'MMMM yyyy'
        ];

        const matchedFormat: string = formats.find(f => isMatch(dateString, f));
        if (ObjectUtils.hasData(matchedFormat)) {
            const dateObj = parse(dateString, matchedFormat, new Date());
            valid = isValid(dateObj);
        }

        return valid;
    }

    static convertToLocalDate(date: Date): Date {
        if (ObjectUtils.isEmpty(date))
            return null;

        const dateObj: Date = new Date(date);
        const localDate = new Date(`${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()} UTC`);
        return localDate;
    }

    static convertToLocalDateString(date: Date): string {
        const localDate: Date = this.convertToLocalDate(date);
        return this.formatDate(localDate);
    }

    static convertToLocalTimeString(date: Date): string {
        const localDate: Date = this.convertToLocalDate(date);
        return this.formatTime(localDate);
    }

    static addMinutes(date: Date, minutes: number): Date {
        const newDate: Date = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    }


    static addDays(date: Date, days: number): Date {
        const newDate: Date = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    static addWeeks(date: Date, weeks: number): Date {
        const days: number = weeks * 7;
        const newDate: Date = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    static addMonths(date: Date, months: number): Date {
        const newDate: Date = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
    }

    static addYears(date: Date, years: number): Date {
        const newDate: Date = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + years);
        return newDate;
    }

    static generateMonths(count: number, excludeFutureMonths: boolean, sortDescending: boolean): Month[] {
        const months: Month[] = [];
        const currentMonth = new Date().getMonth();
        const maxMonth: number = excludeFutureMonths ? currentMonth + 1 : count;

        for (let i = 0; i < maxMonth; i++) {
            months.push({
                name: new Date(0, i).toLocaleString('default', { month: 'long' }),
                value: i + 1
            });
        }

        if (sortDescending)
            months.sort((a, b) => b.value - a.value);
        else
            months.sort((a, b) => a.value - b.value);

        return months;
    }

    static generateYears(count: number, excludeFutureYears: boolean, sortDescending: boolean): number[] {
        const years: number[] = [];
        const currentYear = new Date().getFullYear();
        const maxYear: number = excludeFutureYears ? currentYear : currentYear + count;

        for (let year = currentYear - count; year <= maxYear; year++)
            years.push(year);

        if (sortDescending)
            years.sort((a, b) => b - a);
        else
            years.sort((a, b) => a - b);

        return years;
    }

    static readableTimeStamp(value: Date): string {
        if (ObjectUtils.isEmpty(value))
            return '';

        const now = Date.now();
        const targetTime = new Date(value).getTime();
        const secondsElapsed = Math.floor((now - targetTime) / 1000);
        const isFuture = secondsElapsed < 0;

        const secondsDiff = Math.abs(secondsElapsed);

        if (secondsDiff < 30) {
            return 'Just now';
        }

        const intervals: [unit: string, seconds: number][] = [
            ['year', 31536000],
            ['month', 2592000],
            ['week', 604800],
            ['day', 86400],
            ['hour', 3600],
            ['minute', 60],
            ['second', 1]
        ];

        const matched = intervals.find(([unit, secondsInUnit]) => {
            return Math.floor(secondsDiff / secondsInUnit) > 0;
        });

        if (matched) {
            const [unit, secondsInUnit] = matched;
            const count = Math.floor(secondsDiff / secondsInUnit);
            const suffix = isFuture ? 'from now' : 'ago';
            return `${count} ${unit}${count > 1 ? 's' : ''} ${suffix}`;
        }

        return '';
    }

    static convertHoursToDuration(hours: number): string {
        if (hours < 0)
            return '';

        const days = Math.floor(hours / 24);
        const remainingHours = Math.floor(hours % 24);
        const minutes = Math.round((hours % 1) * 60); // if you want fractional hours

        const parts: string[] = [];
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (remainingHours > 0) parts.push(`${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`);
        if (minutes > 0 && days === 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);

        return parts.join(' ');
    }

    static getDaysInHours(hours: number): number {
        return Math.floor(hours / 24);
    }


    static getPreviousMonth(): string {
        const now = new Date();
        const prevMonth = this.addMonths(now, -1);
        const monthName = prevMonth.toLocaleString('default', { month: 'long' });

        return monthName.toString();
    }

    static getPreviousYear(): string {
        const now = new Date();
        const prevYear = this.addYears(now, -1);
        const year = prevYear.getFullYear();

        return year.toString();
    }

    static isDateEqual(firstDate: Date, secondDate: Date): boolean {
        const dateOne: Date = new Date(firstDate);
        const dateTwo: Date = new Date(secondDate);
        dateOne.setHours(0, 0, 0, 0);
        dateTwo.setHours(0, 0, 0, 0);

        return dateOne === dateTwo;
    }

    static getDayOccurence(input: Date): number {
        const date: Date = new Date(input);
        const occurence = Math.ceil(date.getDate() / 7);
        return occurence;
    }

    static getDayOccurenceLabel(input: Date): string {
        const date: Date = new Date(input);
        const dayName = date.toLocaleString('en', { weekday: 'long' });
        const occurence = this.getDayOccurence(input)
        const ordinals = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const nthText = ordinals[occurence - 1] || `${occurence}th`;

        return `${nthText} ${dayName}`;
    }

    static getMonthName(input: Date): string {
        const monthName = new Date(input).toLocaleString('en', { month: 'long' });
        return monthName;
    }

    static getNextMinuteDate(input: Date, minuteStep: number): Date {
        const date = new Date(input);
        date.setSeconds(0, 0);

        const minutes = date.getMinutes();
        const remainder = minutes % minuteStep;
        const addMinutes = remainder === 0 ? 0 : minuteStep - remainder;

        date.setMinutes(minutes + addMinutes);

        return date;
    }

    static getDateDayNumber(input: Date): number {
        const date: Date = new Date(input);
        return date.getDate();
    }

    static getHourDifference(input1: Date, input2: Date): number {
        const date1: Date = new Date(input1);
        const date2: Date = new Date(input2);

        const diffMs = Math.abs(date2.getTime() - date1.getTime());
        return diffMs / (1000 * 60 * 60); // Convert ms to hours
    }

    static getTimezoneOffsetString(input: Date): string {
        const date = new Date(input);
        const offsetMinutes = -date.getTimezoneOffset(); // negate to match UTC+X instead of UTC-X
        const hours = Math.floor(Math.abs(offsetMinutes) / 60);
        const minutes = Math.abs(offsetMinutes) % 60;

        const sign = offsetMinutes >= 0 ? '+' : '-';
        const hh = String(hours).padStart(2, '0');
        const mm = String(minutes).padStart(2, '0');

        return `${sign}${hh}:${mm}:00`;
    }

    static generateMonthDates(start: Date, end: Date): Date[] {
        const months: Date[] = [];
        let current = new Date(start);

        while (current <= end) {
            months.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
        }

        return months;
    }

    static autoConvertFirestoreTimestamps(obj: any): any {
        if (!obj || typeof obj !== 'object') return obj;

        if (obj instanceof Timestamp) {
            return obj.toDate();
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.autoConvertFirestoreTimestamps(item));
        }

        const converted: any = {};
        for (const key of Object.keys(obj)) {
            converted[key] = this.autoConvertFirestoreTimestamps(obj[key]);
        }

        return converted;
    }

    static convertDatesToFirestoreTimestamps(obj: any): any {
        const result: any = Array.isArray(obj) ? [] : {};

        for (const key in obj) {
            const value = obj[key];

            if (value instanceof Date) {
                result[key] = Timestamp.fromDate(value);
            } else if (value !== null && typeof value === 'object') {
                // Recursively convert nested objects/arrays
                result[key] = DateUtils.autoConvertFirestoreTimestamps(value);
            } else {
                result[key] = value;
            }
        }

        return result;
    }
}