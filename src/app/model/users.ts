import { UserRole } from "./enumeration/user-role";

export interface Users {
    userId: number;
    lastName: string;
    firstName?: string; // Optional field
    email: string;
    password: string;
    phone?: string; // Optional field
    address?: string; // Optional field
    imageUrl?: string; // Optional field
    enable?: boolean;
    accountLocked?: boolean;
    isUsingMfa?: boolean;
    role?: UserRole;
}
