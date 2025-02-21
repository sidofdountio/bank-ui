import { Bank } from "./bank";

export interface Branch {
    id: number;
    name: string;
    address: string;
    email: string;
    bank: Bank;
    branchCode: string;
}
