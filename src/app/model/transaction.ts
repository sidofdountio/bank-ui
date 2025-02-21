import { Account } from "./account";
import { TransactionStatus } from "./enumeration/transaction-status";
import { TransactionType } from "./enumeration/transaction-type";

export interface Transaction {
    transactionId: number;
  transactionReference: string;
  createdAt: Date; // LocalDate in Java is equivalent to Date in TypeScript
  processedAt?: Date; // Optional field
  status: TransactionStatus;
  description?: string; // Optional field
  reference?: string; // Optional field
  debit?: number; // BigDecimal in Java is equivalent to number in TypeScript and optional
  credit?: number; // BigDecimal in Java is equivalent to number in TypeScript and optional
  amount: number; // BigDecimal in Java is equivalent to number in TypeScript
  balanceAfterTransaction: number; // BigDecimal in Java is equivalent to number in TypeScript
  type: TransactionType;
  account: Account; // Reference to the Account interface
}
