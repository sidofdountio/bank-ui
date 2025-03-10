import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthRequest } from '../request/auth-request';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';
import { CustomResponse } from '../response/custom-response';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_TOKEN: string = 'BANK_APP_JWT_TOKEN';
  private loggerUser: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  readonly URL: string = environment.URL + '/auth';

  constructor(private http: HttpClient) { }



  login(request: AuthRequest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.URL}/authentication`, request)
      .pipe(
        tap((response)=>{
      
          this.doLogin(request.email, response.data.authResponse.token);
        })
      )
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
    // if there's no exp property in the decoded token, it means the token is not expired yet.
    if (!decoded.exp){
      return true;
    }

    if (decoded.exp){
    //  localStorage.removeItem(this.JWT_TOKEN);
     localStorage.clear();
    }
   

   
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }


  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  getLoggerUser(): string {
    return this.loggerUser;
  }


  public set token(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  get token() {
    return localStorage.getItem(this.JWT_TOKEN) as string;
  }

}

