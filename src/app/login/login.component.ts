import { Component, inject } from '@angular/core';
import { SharedModule } from '../_shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_shared/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Standard properties for form state
  username: string = '';
  password: string = '';

  isLoggingIn: boolean = false;
  loginFailed: boolean = false;

  constructor() {

  }

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);


  onLogin(): void {
    this.isLoggingIn = true;
    this.loginFailed = false;

    this.authService.login(this.username, this.password).then(() => {
      this.navigateToHome();
    }).catch(() => {
      this.loginFailed = true;
    }).finally(() => {
      this.isLoggingIn = false;
    });
  }

  // Register handler
  onRegister(): void {

  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
