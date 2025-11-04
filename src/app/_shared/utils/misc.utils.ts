import { DateUtils } from "./date.utils";
import { ObjectUtils } from "./object.utils";

export class MiscUtils {
    static generateRandomString(minLength: number, maxLength: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }

    static removeSpaces(input: string): string {
        return input.replace(/\s+/g, "");
    }

    static fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    static getTeamInitials(teamName: string): string {
        const words = teamName.trim().split(' ');

        if (words.length === 1) {
            // Only one word → take first letter
            return words[0].charAt(0).toUpperCase();
        }

        // Two or more words → take first letter of first two words
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }

    static checkLiveMatch(startDate: Date, endDate: Date): boolean {
        const now: Date = new Date();
        const preStart: Date = DateUtils.addMinutes(startDate, 15);
        return now >= preStart && now <= endDate;
      }
}
