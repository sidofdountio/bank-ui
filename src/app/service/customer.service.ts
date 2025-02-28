import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CustomResponse } from '../response/custom-response';
import { CustomerRequest } from '../request/customer-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private readonly URL = environment.URL + `/customers`;

  constructor(private http: HttpClient) { }

  customers$ = () => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}`).pipe(tap());

  customer$ = (customerId: number) => <Observable<CustomResponse>>
    this.http
      .get<any>(`${this.URL}/customer?customerId=${customerId}`).pipe(tap());

  // Add Item to the cart
  add$ = (request: CustomerRequest, httpContext?: HttpContext) => <Observable<CustomResponse>>this
    .http.post<any>(`${this.URL}/save`, request)
    .pipe(tap(console.log));

}
