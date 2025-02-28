import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataState } from '../../../model/enumeration/data-state';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'firstname', 'action'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>([]);
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService) {
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers(): void {
    this.appState = DataState.LOADING_STATE;
    this.customerService.customers$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.dataSource.data = response.data.customers;
        this.appState = DataState.LOADED_STATE;
      }),
      error: (error) => {
        console.error(error);
        // this.notifier.onError("Oups! something whent wrong !");
        this.appState = DataState.ERROR_STATE;
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
