import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Account } from '../../../model/account';
import { DataState } from '../../../model/enumeration/data-state';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-account-list',
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
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {

  displayedColumns: string[] = ['lastName','accountNumber', 'balance', 'deposit','withdraw','transfer','cheque','maintenance','model-details','details'];
  dataSource: MatTableDataSource<Account> = new MatTableDataSource<Account>([]);
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  private getAccounts(): void {
    this.appState = DataState.LOADING_STATE;
    this.accountService.accounts$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.dataSource.data = response.data.accounts;
        console.log(this.dataSource.data)
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
