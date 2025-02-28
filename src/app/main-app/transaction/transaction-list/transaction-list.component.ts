import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataState } from '../../../model/enumeration/data-state';
import { Transaction } from '../../../model/transaction';
import { TransactionService } from '../../../service/transaction.service';
import { NumberFormatPipe } from '../../../number.pipe';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    NumberFormatPipe,
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
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'libele', 'valeur', 'debit', 'credit', 'solde', 'action', 'edit'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);
  appState: DataState = DataState.LOADING_STATE;
  readonly DataState = DataState;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionService: TransactionService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getTrasanctions();
  }

  private getTrasanctions(): void {
    this.appState = DataState.LOADING_STATE;
    this.transactionService.transactions$().subscribe({
      next: (response => {
        // this.notifier.onDefault(response.message);
        this.dataSource.data = response.data.transactions;
        
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
