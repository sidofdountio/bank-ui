import { AccountType } from "../model/enumeration/account-type";

export interface AccountRequest {
    accountType: AccountType;
    balance: number; // BigDecimal in Java is equivalent to number in TypeScript
    customerId: number; // Long in Java is equivalent to number in TypeScript
    branchCode: string;
    rib?: string; // Optional field
    iban?: string; // Optional field
    accountNumber?: string; // Optional field
    createdAt: Date;
}
