export interface AuthToken {
    accessToken: string;
    accessTokenExpiryUTC: Date;
    refreshToken: string;
    refreshTokenExpiryUTC: Date;
}