export interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    customerCode: string;
    address: string;
    // Add additional fields as needed
    hasAccount?: boolean;
    secondFirstName?:string;
    secondLastName?: string;
    dateOfBirth:string;
}
