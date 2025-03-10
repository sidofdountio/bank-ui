import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TransactionRequest } from '../../../request/transaction-request';
import { TransactionType } from '../../../model/enumeration/transaction-type';
import { AccountStatus } from '../../../model/enumeration/account-status';
import { AccountType } from '../../../model/enumeration/account-type';
import { Account } from '../../../model/account';
import { AccountService } from '../../../service/account.service';
import { TransactionService } from '../../../service/transaction.service';
import { GabATM } from '../../../model/utils/gab';

@Component({
  selector: 'app-transaction-gab',
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
  templateUrl: './transaction-gab.component.html',
  styleUrl: './transaction-gab.component.css'
})
export class TransactionGabComponent implements OnInit {
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
    transactionType: TransactionType.ATM_WITHDRAWAL
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
  atm: string[] = ["", "", "", "", "", "", "", "",]
  gabs: GabATM[] = [
    { name: "GAB N1 RETRAITE" },
    { name: "GAB N1 MFOUDI" },
    { name: "GAB N2 MFOUDI" },
    { name: "GAB N2 MILLENIUM" },
    { name: "GAB N1 MEDONG" },
    { name: "GAB N2 MEDONG" },
    { name: "GAB N1 MARCHER CENTRE" },
    { name: "GAB N2 MARCHER CENTRE" },
    { name: "GAB N1 BYEM-ASSI" },
    { name: "GAB N2 BYEM-ASSI" },
    { name: "GAB N3 MESSA" },
    { name: "GAB N1 MESSA" },
    { name: "GAB N2 MESSA" },
    { name: "GAB N2 BYEM-ASSI CAR" },
    { name: "GAB N1 CAMAIR" },
    { name: "GAB POSTE CENTRAL" },


  ]; //

  constructor(
    private location: Location,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private acccountService: AccountService,
    private fb: FormBuilder, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.accountId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getAccountById(this.accountId);


    this.transactionForm = this.fb.group({
      balance: [0, [Validators.required]],
      releasedAt: [0, [Validators.required]],
      description: ['', [Validators.required]]
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
    this.request.description = this.transactionForm.value.description;
    this.request.accountId = this.account.accountId;

    console.log(this.request)
    this.save(this.request);
  }


  save(request: TransactionRequest): void {
    this.transactionService.gab$(request).subscribe(
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
