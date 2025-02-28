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
    RouterModule
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
      bank: undefined,
    },
    customer: undefined
  };
  accountId: number = 0;
  customername: string = '';

  constructor(
    private pdfService: PdfService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.accountId = parseInt(param.get("id"));
    });

    this.getAccount(this.accountId);
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








  exportPdf2() {
    throw new Error('Method not implemented.');
  }
  exportPdf1() {
    throw new Error('Method not implemented.');
  }

}
