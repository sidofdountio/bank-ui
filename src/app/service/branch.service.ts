import { Injectable } from '@angular/core';
import { CustomResponse } from '../response/custom-response';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BranchRequest } from '../request/branch-request';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  // API endpoints
  private URL: any = environment.URL + '/branches';

  constructor(private http: HttpClient) { }

  createBranch(request: BranchRequest): Observable<CustomResponse> {
    return this.http.post<any>(`${this.URL}/save`, request)
  }

  getBranch(branchId: number): Observable<CustomResponse> {

    return this.http.get<CustomResponse>(`${this.URL}/branch?branchId=${branchId}`);
  }

  getBranchCode(branchCode: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.URL}/branch-code?branchCode=${branchCode}`);
  }

  getBranches(): Observable<CustomResponse> {
    return this.http.get<any>(`${this.URL}`).pipe();
  }

}
