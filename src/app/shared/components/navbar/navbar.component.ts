import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  unreadCount = 3;
  currentUser$ = this.authService.currentUser$;
  
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const theme = localStorage.getItem('logisight_theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('logisight_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('logisight_theme', 'light');
    }
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        this.searchInput?.nativeElement.focus();
      }
    }
  }
}
