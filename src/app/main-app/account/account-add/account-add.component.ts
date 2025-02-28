import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AccountType } from '../../../model/enumeration/account-type';
import { AccountRequest } from '../../../request/account-request';
import { Customer } from '../../../model/customer';
import { Bank } from '../../../model/bank';
import { AccountService } from '../../../service/account.service';
import { CustomerService } from '../../../service/customer.service';
import { Branch } from '../../../model/branch';
import { BranchService } from '../../../service/branch.service';

@Component({
  selector: 'app-account-add',
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
    MatSelectModule,
  ],
  providers: [DatePipe],
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent implements OnInit {


  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  accountForm: FormGroup<any>

  messageSuccess: string = '';
  messageError: string = '';

  branches: Branch[] = [];

  request: AccountRequest = {
    accountType: AccountType.SAVINGS,
    balance: 0,
    customerId: 0,
    branchCode: '',
    rib: '',
    iban: '',
    accountNumber: '',
    createdAt: undefined
  }
  customers: Customer[] = [];
  banks: Bank[] = [];
  createdDate: any = "";

  datePickerFrom: FormGroup<any>;

  constructor(
    private branchService: BranchService,
    private datePipe: DatePipe,
    private acccountService: AccountService,
    private customerService: CustomerService,
    private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getCustomers();
    // this.getBranches();
    this.accountForm = this.fb.group({
      customerId: ['', [Validators.required]],
      // branchCode: ['', [Validators.required]],
      balance: [0, [Validators.required,Validators.max(10000000)]],
      accountNumber: [''],
      iban: [''],
      rib: [''],
      releasedAt: []
    });
  }

  onDateChange($event: MatDatepickerInputEvent<Date>) {
    if ($event.value) {
      this.createdDate = this.datePipe.transform($event.value, 'yyyy-MM-dd');
    }
  }



  onSelectCustomer($event: MatSelectChange) {
    console.log($event.value);
    this.request.branchCode = $event.value.branch.branchCode;
    this.request.customerId = $event.value.customerId;
   
  }


  onSave() {
    
    this.request.balance = this.accountForm.value.balance;
    this.request.createdAt = this.createdDate;

    
    if (this.request.branchCode === '') {
      this.messageError = "Please select a customer number";
      throw new Error('Please select a customer number');
    }

    console.log(this.request);
    this.saveNewAccount(this.request);

  }

  saveNewAccount(request: AccountRequest): void {
    this.loading.next(true);

    this.acccountService.add$(request).subscribe(
      {
        next: (response) => {
          this.messageSuccess = response.message;
          this.loading.next(false);
          
        },
        error: (error) => {
          this.loading.next(false);
          this.messageError = "An error occured !"+ error.error.validationErrors
          if (error.validationErrors) {
            console.error(error);
          }
        }
      }
    )
  }




  private getCustomers(): void {
    this.customerService.customers$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.customers = response.data.customers;
      }),
      error: (error) => {
        console.error(error);
        // this.notifier.onError("Oups! something whent wrong !");
      }
    });
  }


  private getBanks(): void {
    this.customerService.customers$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.customers = response.data.customers;
      }),
      error: (error) => {
        console.error(error);
        // this.notifier.onError("Oups! something whent wrong !");
      }
    });
  }

  getBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (response) => {
        this.branches = response.data.branches;
        console.log(response)
      },
      error: (error) => console.error('Error retrieving branches', error)
    });
  }
}
