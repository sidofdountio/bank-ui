import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { CustomerRequest } from '../../../request/customer-request';
import { MatSelectModule } from '@angular/material/select';
import { Branch } from '../../../model/branch';
import { BranchService } from '../../../service/branch.service';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  customerForm: FormGroup<any>
  request: CustomerRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    branchCode: ''
  }
  messageSuccess: string = '';
  messageError: string = '';

  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.getBranches();
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      branchCode: ['', [Validators.required]]
    });
  }

  onSave() {
    this.request.email = this.customerForm.value.email;
    this.request.lastName = this.customerForm.value.lastName;
    this.request.firstName = this.customerForm.value.firstName;
    this.request.phoneNumber = this.customerForm.value.phoneNumber;
    this.request.branchCode = this.customerForm.value.branchCode;
    console.log(this.request)

    this.save(this.request);
  }

  save(request: CustomerRequest): void {
    this.loading.next(true);
    this.customerService.add$(this.request).subscribe(
      {
        next: (response) => {
          this.loading.next(false);
          this.messageSuccess = response.message;
        },
        error: (error) => {
          this.loading.next(false);
          if (error) {
            this.messageError = "An error occured";
          }
          if (error.error.validationError) {
          } else {
            // this.notifier.onWarning(error.error.validationError);
          }
          if (error.error.errorCode === 3005) {
            console.log("Username or password incorret ");
          }
          if (error.error.errorCode === 3003) {
            console.log("Your account is disabled");
          }
          if (error.error.errorCode === 3004) {
            console.log("Your account is disabled");
          }
        }
      }
    );

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
