import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../../request/auth-request';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  loginForm: FormGroup<any>;

  constructor(
    private fbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fbuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    // Call login service to authenticate and store token
    this.loading.next(true);
    const request: AuthRequest = { email, password };
    console.log(request);

    this.authService.login(request).subscribe(
      {
        next: (response) => {
          this.loading.next(false);
          // console.log(response);
          // this.getCurrentUser();
          this.router.navigate(["/app"]);
        },
        error: (error) => {
         
          this.loading.next(false);
            if (error.error.validationError) {
              // this.notifier.onWarning(error.error.validationError);
            } else {
              // this.notifier.onWarning(error.error.validationError);
            }
            if (error.error.errorCode === 3005) {
              // this.notifier.onError("Username or password incorret ");
            }
            if (error.error.errorCode === 3003) {
              // this.notifier.onError("Your account is disabled");
            } 
            if (error.error.errorCode === 3004) {
              // this.notifier.onError("Your account is disabled");
            }
          console.error(error)
        }
      }
    )

  }

}
