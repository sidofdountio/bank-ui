import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Transaction } from '../model/transaction';
import { TransactionRequest } from '../request/transaction-request';
import { UpdateTransactionRequest } from '../request/update-transaction-request';
import { CustomResponse } from '../response/custom-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly URL = environment.URL + `/transactions`;

  constructor(private http: HttpClient) { }


  totalDebit$ = (accountId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/sum-debit?accountId=${accountId}`).pipe(
    );

  totalCredit$ = (accountId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/sum-credit?accountId=${accountId}`).pipe(
        tap()
      );

  firstTransaction$ = (accountId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/first-tranction?accountId=${accountId}`).pipe(
    );

  lastTransaction$ = (accountId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/last-tranction?accountId=${accountId}`).pipe(
    );

  // deposite
  deposit$ = (request: TransactionRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>
    this
      .http
      .post<any>(`${this.URL}/deposit`, request).pipe(
    );
  // make cheque
  cheque$ = (request: TransactionRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>
    this
      .http
      .post<any>(`${this.URL}/cheque`, request).pipe(
    );

  // make cheque
  maintenance$ = (request: TransactionRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>
    this
      .http
      .post<any>(`${this.URL}/maintenance`, request).pipe(
    );

  // withdrawal
  withdraw$ = (request: TransactionRequest) => <Observable<CustomResponse>>
    this
      .http
      .post<any>(`${this.URL}/withdraw`, request).pipe(
    );

  // tranfer
  transfer$ = (request: TransactionRequest) => <Observable<CustomResponse>>
    this
      .http
      .post<any>(`${this.URL}/transfer`, request).pipe(
    );



  transaction$ = (accountId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/account?accountId=${accountId}`).pipe(
    );


  // transaction1$ = (page: number = 0, size: number = 10, accountId: number) => <Observable<CustomPageResponse<Page<Transaction>>>>
  //   this.http
  //     .get<any>(`${this.URL}/transaction1?page=${page}&size=${size}&accountId=${accountId}`);


  // transaction2$ = (page: number = 0, size: number = 10, accountId: number) => <Observable<CustomPageResponse<Page<Transaction>>>>
  //   this.http
  //     .get<any>(`${this.URL}/transaction2?page=${page}&size=${size}&storeId=${accountId}`)

  // transaction3$ = (page: number = 0, size: number = 10, accountId: number) => <Observable<CustomPageResponse<Page<Transaction>>>>
  //   this.http
  //     .get<any>(`${this.URL}/transaction3?page=${page}&size=${size}&storeId=${accountId}`)




  transactions$ = () => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}`).pipe(tap(console.log));

  updateTransaction$ = (transactionId: number, request: UpdateTransactionRequest) => <Observable<CustomResponse>>
    this
      .http
      .put<any>(`${this.URL}/update?transactionId=${transactionId}`, request).pipe(
    );


  transactionById$ = (transactionId: number) => <Observable<CustomResponse>>
    this
      .http
      .get<any>(`${this.URL}/transaction-id?transactionId=${transactionId}`).pipe(
    );
}
