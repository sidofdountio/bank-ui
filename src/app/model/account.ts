import { Branch } from "./branch";
import { Customer } from "./customer";
import { AccountStatus } from "./enumeration/account-status";
import { AccountType } from "./enumeration/account-type";

export interface Account {
    accountId: number;
    accountNumber: string;
    balance: number; // BigDecimal in Java is equivalent to number in TypeScript
    initialBalance: number; // BigDecimal in Java is equivalent to number in TypeScript
    status: AccountStatus;
    accountType: AccountType;
    rib: string; // Required field
    iban: string; // Required field
    branch: Branch; // Reference to the Branch interface
    customer: Customer; // Reference to the Customer interface
    createdAt?:any;
}
