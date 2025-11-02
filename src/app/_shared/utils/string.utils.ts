export class StringUtils {
  static formatDecimalPlaces(value: number, minDigit: number, maxDigit: number): string {
    const result: string = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minDigit,
      maximumFractionDigits: maxDigit,
    }).format(value);
    return result;
  }

  static formatSpaces(text: string): string {
    return text.replace(/&nbsp;/g, ' ');
  }

  static base64UrlEncode(str: string): string {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
