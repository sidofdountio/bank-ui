import { Account } from "../model/account";
import { Customer } from "../model/customer";
import { Transaction } from "../model/transaction";

export interface CustomResponse {
    timeStamp: string;
    statusCode: number;
    status: string;
    message: string;
    data: {
        sumDebit?: number;
        sumCredit?: number;
        transactions?:Transaction[];
        transaction?:Transaction;
        customers?:Customer[];
        customer?:Customer;
        accounts?:Account[];
        account?:Account;
    }
}

