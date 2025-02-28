import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BranchRequest } from '../../../request/branch-request';
import { BranchService } from '../../../service/branch.service';

@Component({
  selector: 'app-branch-add',
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
  templateUrl: './branch-add.component.html',
  styleUrl: './branch-add.component.css'
})
export class BranchAddComponent {

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  request: BranchRequest = {
    bankId: 0,
    name: '',
    address: '',
    email: '',
    bankCode: '',
    branchCode: ''
  }

  branchForm: FormGroup<any>;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService
  ) {
    this.branchForm = this.fb.group({
      // bankId: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // bankCode: ['', Validators.required],
      branchCode: ['', Validators.required]
    });
  }

  onSave(): void {
    this.request = {
      bankId: 0,
      name: this.branchForm.value.name,
      address: this.branchForm.value.address,
      email: this.branchForm.value.email,
      bankCode: '10005',
      branchCode: this.branchForm.value.branchCode
    }

    console.log(this.request)
    this.save(this.request);
  }

  save(request: BranchRequest): void {
    this.loading.next(true);
    // call service to save branch
    this.branchService.createBranch(request).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.loading.next(false);
          this.router.navigate(['/app/branches']);
        },
        error: (error) => {
          this.loading.next(false);
          console.error(error);
        }
      }
    );
  }


  onReset(): void {
    this.branchForm.reset();
  }
  onCancel() {
    this.router.navigate(['/app/branch-list']);
  }

}
