import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Role } from '../../../../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Using same SCSS file conceptually, but compiled separately
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  roles: { value: Role, label: string, icon: string }[] = [
    { value: 'SENDER', label: 'Sender/Receiver', icon: 'person' },
    { value: 'DRIVER', label: 'Driver', icon: 'local_shipping' },
    { value: 'PICKUP', label: 'Pickup Staff', icon: 'store' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['SENDER', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  setRole(role: Role) {
    this.registerForm.get('role')?.setValue(role);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, role } = this.registerForm.value;

    this.auth.login(email, role).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.toast.success('Registration successful!');
        if (role === 'DRIVER') {
          this.router.navigate(['/driver']);
        } else if (role === 'PICKUP') {
          this.router.navigate(['/pickup']);
        } else {
          this.router.navigate(['/sender']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Registration failed.');
      }
    });
  }
}
