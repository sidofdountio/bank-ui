import { TransactionType } from "../model/enumeration/transaction-type";

export interface TransactionRequest {
    transactionType: TransactionType;
    amount: number;
    createdAt: Date;
    accountId?: number; // Long in Java is equivalent to number in TypeScript
    description:string;
    debit:number;
    credit: number;
    accountNumber: string; // 

}
