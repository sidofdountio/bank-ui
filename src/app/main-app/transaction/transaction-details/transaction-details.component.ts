import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Account } from '../../../model/account';
import { AccountStatus } from '../../../model/enumeration/account-status';
import { AccountType } from '../../../model/enumeration/account-type';
import { PdfService } from '../../../service/pdf.service';
import { TransactionService } from '../../../service/transaction.service';
import { AccountService } from '../../../service/account.service';
import { Transaction } from '../../../model/transaction';
import { DataState } from '../../../model/enumeration/data-state';
import { TransactionStatus } from '../../../model/enumeration/transaction-status';
import { TransactionType } from '../../../model/enumeration/transaction-type';
import { NumberFormatPipe } from '../../../number.pipe';

@Component({
  selector: 'app-transaction-details',
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
    MatIconModule,
    RouterModule,
    NumberFormatPipe
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {

  account: Account = {
    accountId: 1,
    accountNumber: '1234567890',
    balance: 1000,
    initialBalance: 1000,
    status: AccountStatus.ACTIVE,
    accountType: AccountType.SAVINGS,
    rib: 'RIB123',
    iban: 'IBAN123',
    branch: {
      branchCode: 'ABC',
      name: 'ABC Branch',
      address: 'ABC Street',
      email: '12345',
      id: 1,
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
        website: ''
      },
    },
    customer: {
      customerId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      customerCode: '',
      address: '',
      dateOfBirth: ''
    }
  };


  accountId: number = 0;
  transaction: Transaction = {
    transactionId: 0,
    transactionReference: '',
    createdAt: undefined,
    status: TransactionStatus.PENDING,
    amount: 0,
    balanceAfterTransaction: 0,
    type: TransactionType.DEPOSIT,
    account: undefined
  };

  transactionList1: Transaction[] = [];
  transactionList2: Transaction[] = [];
  transactionList3: Transaction[] = [];
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;
  
  customername: string = '';
  endDate: any = '06/03/205';
  currentDate: any;

  constructor(
    private pdfService: PdfService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) { 
    this.currentDate = new Date();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.accountId = parseInt(param.get("id"));
    });

    this.getAccount(this.accountId);
    this.getTrasanctions();
    this.getTrasanction(this.accountId);
  }

  private getAccount(customerId: number) {

    this.accountService.account$(customerId).subscribe(
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


  private getTrasanctions(): void {
    this.appState = DataState.LOADING_STATE;
    this.transactionService.transactions$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.transactionList1 = response.data.transactions;
        
        this.appState = DataState.LOADED_STATE;
      }),
      error: (error) => {
        console.error(error);
        // this.notifier.onError("Oups! something whent wrong !");
        this.appState = DataState.ERROR_STATE;
      }
    });
  }


  private getTrasanction(accountId:number): void {
    for (let i = 0; i < this.transactionList1.length; i++){
      if (this.transactionList1[i].account.accountId === this.accountId) {
        this.transaction = this.transactionList1[i];
        break;
      }
    }
  }








  exportPdf2() {
    throw new Error('Method not implemented.');
  }
  exportPdf1() {
    this.pdfService.generatePdf("content-to-download", this.account.customer.lastName + " " + this.account.accountNumber);
  }

}
