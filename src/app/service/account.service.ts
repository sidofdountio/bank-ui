import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CustomResponse } from '../response/custom-response';
import { AccountRequest } from '../request/account-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly URL = environment.URL + `/accounts`;

  constructor(private http: HttpClient) { }

  account$ = (bankAccountId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/${bankAccountId}`);

  accounts$ = () => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}`);

  // Add Item to the cart
  add$ = (request: AccountRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>
    this.http
      .post<any>(`${this.URL}/save`, request).pipe(tap(console.log));

  convertAccountBalanceToCannada = (accountById: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/canada/${accountById}`).pipe();


}
