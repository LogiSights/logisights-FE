import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, Role } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const saved = localStorage.getItem('logisight_user');
    if (saved) {
      try {
        this.currentUserSubject.next(JSON.parse(saved));
      } catch(e) {}
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, role: Role = 'SENDER'): Observable<User> {
    const user: User = { id: 'u1', name: 'Demo User', email, role };
    // Simulate API delay
    return of(user).pipe(
      delay(1500),
      tap(u => {
        localStorage.setItem('logisight_user', JSON.stringify(u));
        this.currentUserSubject.next(u);
      })
    );
  }

  logout() {
    localStorage.removeItem('logisight_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  switchRole(role: Role) {
    if (this.currentUserValue) {
      const updated = { ...this.currentUserValue, role };
      localStorage.setItem('logisight_user', JSON.stringify(updated));
      this.currentUserSubject.next(updated);
    }
  }
}
