import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TransactionRequest } from '../../../request/transaction-request';
import { TransactionType } from '../../../model/enumeration/transaction-type';
import { Account } from '../../../model/account';
import { AccountType } from '../../../model/enumeration/account-type';
import { AccountStatus } from '../../../model/enumeration/account-status';
import { TransactionService } from '../../../service/transaction.service';
import { AccountService } from '../../../service/account.service';
import { CustomerService } from '../../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { UserFake } from '../../../model/utils/user-fake';

@Component({
  selector: 'app-transaction-tranfer-out',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './transaction-tranfer-out.component.html',
  styleUrl: './transaction-tranfer-out.component.css'
})
export class TransactionTranferOutComponent implements OnInit {
  transactionForm: FormGroup<any>;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  accountId: number = 0;
  messageSuccess: string = '';
  messageError: string = '';

  request: TransactionRequest = {
    amount: 0,
    createdAt: undefined,
    description: '',
    debit: 0,
    credit: 0,
    accountNumber: '',
    accountId: 0,
    transactionType: TransactionType.TRANSFER_OUT,
  }

  account: Account = {
    accountNumber: '',
    accountType: AccountType.SAVINGS,
    balance: 0,
    customer: {
      customerId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      customerCode: ''
    },
    accountId: 0,
    initialBalance: 0,
    status: AccountStatus.ACTIVE,
    rib: '',
    iban: '',
    branch: {
      id: 0,
      name: '',
      address: '',
      email: '',
      bank: {
        id: 0,
        name: '',
        logoUrl: '',
        banckCosde: '',
        ribKey: '',
        swiftCode: '',
        headOfficeAddress: '',
        phoneNumber: '',
        email: '',
        website: '',
      },
      branchCode: ''
    }
  }
  createdDate: any = "";

  datePickerFrom: FormGroup<any>;

  customername: string = "";
  users: UserFake[] = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Alice Doe' },
    { name: 'Bob Doe' },
    { name: 'Emily Doe' },
    { name: 'David Doe' },
    { name: 'Sarah Doe' },
    { name: 'Michael Doe' },
    { name: 'Chris Doe' },
    { name: 'Laura Doe' },
    { name: 'Olivia Doe' },
    { name: 'Andrew Doe' },
    { name: 'Ryan Doe' },
    { name: 'Jessica Doe' },
    { name: 'Daniel Doe' },
    { name: 'Matthew Doe' },
    { name: 'David Lee' },
    { name: 'Sophia Doe' },
    { name: 'Michael Lee' },
    { name: 'Christopher Lee' },
  ];

  constructor(
    private location: Location,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private acccountService: AccountService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.accountId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getAccountById(this.accountId);


    this.transactionForm = this.fb.group({
      balance: [0, [Validators.required]],
      releasedAt: [0, [Validators.required]]
    });



    // Handle date change event 
  }



  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.createdDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    }
  }


  onSave() {
    this, this.request.accountNumber = this.account.accountNumber;
    this.request.amount = this.transactionForm.value.balance;
    this.request.createdAt = this.createdDate;
    this.request.debit = this.transactionForm.value.balance;
    this.request.description = "V/R " + this.account.customer.lastName + " " + this.account.customer.firstName;
    this.request.accountId = this.account.accountId;

    console.log(this.request)
    this.save(this.request);
  }


  save(request: TransactionRequest): void {
    this.transactionService.transferOut$(request).subscribe(
      {
        next: (response) => {
          this.messageSuccess = response.message;
        },
        error: (error) => {
          if (error.validationError) {
            this.messageError = error.error.error;
          } else {
          }
          if (error.error.errorCode === 49) {
            this.messageError = error.error.error;
          }
          this.messageError = error.error.error;
          // this.messageError = "An error occured. Connot process this deposit";
          console.error(error);
        }
      }
    )
  }




  private getAccountById(customerId: number) {
    this.acccountService.account$(customerId).subscribe(
      {
        next: (response) => {
          // this.messageSuccess = response.message;
          this.account = response.data.account;
          this.customername = this.account.customer.lastName + " " + this.account.customer.firstName;
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }


  onGoBack() {
    this.location.back()
  }

}
