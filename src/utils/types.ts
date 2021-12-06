export type SignedIn = {
    signedIn: boolean;
};

export type AppUser = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string | null;
    refreshToken: string;
    emailVerified: boolean;
};
