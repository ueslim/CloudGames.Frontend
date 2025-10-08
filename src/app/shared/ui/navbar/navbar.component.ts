import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  currentUser$ = this.auth.currentUser$;

  constructor(private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) {}

  get isAdmin(): boolean {
    const token = this.auth.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) return false;
    const decoded: any = this.jwtHelper.decodeToken(token);
    const rawRole = decoded?.role ?? decoded?.roles ?? decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    let roles: string[] = [];
    if (Array.isArray(rawRole)) roles = rawRole as string[];
    else if (typeof rawRole === 'string') roles = [rawRole];
    return roles.includes('Administrator');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}


