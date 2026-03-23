import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Role } from '../../../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email } = this.loginForm.value;

    this.auth.login(email, 'SENDER').subscribe({
      next: (user) => {
        this.isLoading = false;
        this.toast.success(`Welcome back, ${user.name}!`);
        this.navigateToDashboard(user.role);
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Login failed. Please try again.');
      }
    });
  }

  onQuickLogin(role: Role) {
    this.isLoading = true;
    const email = `${role.toLowerCase()}@logisight.com`;
    
    this.auth.login(email, role).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.toast.success(`Logged in as ${role}`);
        this.navigateToDashboard(role);
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Quick login failed.');
      }
    });
  }

  private navigateToDashboard(role: Role) {
    const route = role === 'ADMIN' ? '/admin' : 
                   role === 'DRIVER' ? '/driver' : 
                   role === 'PICKUP' ? '/pickup' : '/sender';
    this.router.navigate([route]);
  }
}
