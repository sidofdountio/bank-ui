import { Branch } from "./branch";

export interface Bank {
    id: number;
    name: string;
    logoUrl: string;
    banckCosde: string;
    ribKey: string;
    swiftCode: string;
    headOfficeAddress: string;
    phoneNumber: string;
    email: string;
    website: string;
    branches: Branch[];
}
