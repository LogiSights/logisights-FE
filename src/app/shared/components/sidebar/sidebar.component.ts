import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { User, Role } from '../../../core/models';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  roles: Role[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarState', [
      state('expanded', style({ width: '240px' })),
      state('collapsed', style({ width: '64px' })),
      transition('expanded <=> collapsed', animate('0.25s ease'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  isHovered = false;
  currentUser$: Observable<User | null> = this.authService.currentUser$;

  navItems: NavItem[] = [
    { label: 'Sender Dashboard', route: '/sender', icon: 'dashboard', roles: ['SENDER'] },
    { label: 'Driver Tasks', route: '/driver', icon: 'directions_car', roles: ['DRIVER'] },
    { label: 'Pickup Point', route: '/pickup', icon: 'storefront', roles: ['PICKUP'] },
    { label: 'Admin Panel', route: '/admin', icon: 'admin_panel_settings', roles: ['ADMIN'] }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth < 768 || window.location.pathname.includes('/driver')) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isCollapsed) {
      this.isHovered = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  get actualCollapsedState(): boolean {
    return this.isCollapsed && !this.isHovered;
  }

  getFilteredNavItems(user: User | null): NavItem[] {
    if (!user) return [];
    return this.navItems.filter(item => item.roles.includes(user.role));
  }
}
