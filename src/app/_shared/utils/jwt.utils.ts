import { StringUtils } from "./string.utils";
import { AUTH_TOKEN_EXPIRATION_DAYS } from "../constants";

export class JwtUtils {
  static encode(payload: object): string {
    const header = {
      alg: 'none',
      typ: 'JWT'
    };

    const secondsPerDay = 86400;
    const exp = AUTH_TOKEN_EXPIRATION_DAYS ? Math.floor(Date.now() / 1000) + AUTH_TOKEN_EXPIRATION_DAYS * secondsPerDay : undefined;

    const fullPayload = exp ? { ...payload, exp } : payload;

    const headerEncoded = StringUtils.base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = StringUtils.base64UrlEncode(JSON.stringify(fullPayload));

    return `${headerEncoded}.${payloadEncoded}.`;
  }
}
