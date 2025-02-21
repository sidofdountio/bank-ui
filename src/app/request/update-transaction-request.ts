export interface UpdateTransactionRequest {
    transactionId: number;
    amount?: number;
    description: string;
    createAt: Date;
    accountId?: number; // Long in Java is equivalent to number in TypeScript
    debit?: number;
    credit?: number;


}
