import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   let auth = inject(AuthService);
  const jwtToken = getJWTToken();
  if (jwtToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }
  // check  if the current is register is yes should not send token to the header
  if(req.url.includes(auth.URL )) {
    console.log('auth', auth.URL);
    return next(req); 
  }
  // if(req.url.includes('/auth/register')) return next(req); 
  
  return next(req);
};

function getJWTToken():string | null{
  // Assuming the JWT token is stored in local storage with the key "PAUPIERE_JWT_TOKEN"
  let token = localStorage.getItem("BANK_APP_JWT_TOKEN");
  if(!token) return null;
  return token;
}
