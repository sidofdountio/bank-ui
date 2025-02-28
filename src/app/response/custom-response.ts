import { Account } from "../model/account";
import { Branch } from "../model/branch";
import { Customer } from "../model/customer";
import { Transaction } from "../model/transaction";
import { AuthResponse } from "../request/auth-response";

export interface CustomResponse {
    timeStamp: string;
    statusCode: number;
    status: string;
    message: string;
    data: {
        branches?: Branch[];
        branche?: Branch;
        sumDebit?: number;
        sumCredit?: number;
        transactions?:Transaction[];
        transaction?:Transaction;
        customers?:Customer[];
        customer?:Customer;
        accounts?:Account[];
        account?:Account;
        authResponse?:AuthResponse;
    }
}

