import { Users } from "./users";

export interface Token {
    id: number;
    token: string;
    refreshToken: string;
    createAt: Date;
    expireAt: Date;
    expired: boolean;
    revoked: boolean;
    user: Users; // Ref
}
