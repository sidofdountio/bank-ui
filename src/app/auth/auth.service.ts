import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthRequest } from '../request/auth-request';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';
import { CustomResponse } from '../response/custom-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_TOKEN: string = 'BANK_APP_JWT_TOKEN';
  private loggerUser: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  URL: string = environment.URL + '/auth';

  constructor(private http: HttpClient) { }



  login(request: AuthRequest): Observable<CustomResponse> {
    return this.http.post<any>(`${this.URL}/authentication`, request)
      .pipe()
  }

  getCurrentAuthUser() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get(`${this.URL}/me`
    )
  }

  private doLogin(email: string, token: string | any) {
    this.loggerUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN)
    this.isAuthenticatedSubject.next(false);
  }

  isLoggeIn(): boolean {
    return this.isAuthenticatedSubject.value
  }

  isLoggedIn1(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }


  isTokenExpired() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (!token) return true;

    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  getLoggerUser(): string {
    return this.loggerUser;
  }

}

