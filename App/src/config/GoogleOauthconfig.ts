export const GoogleoauthConfig = {
    alias: "google",
    accessTokenUri: "https://oauth2.googleapis.com/token",
    authUri: "https://accounts.google.com/o/oauth2/v2/auth",
    refreshTokenUri: "https://oauth2.googleapis.com/token",
    revokeTokenUri: "https://oauth2.googleapis.com/revoke",
    defaultScopes: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.compose",
    ],
};
