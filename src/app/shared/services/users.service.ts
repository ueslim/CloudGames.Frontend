import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  // other fields can be added as needed
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseUrl = `${environment.USERS_API}/api/users`;

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }

  authenticate(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticate`, payload);
  }

  getMe(): Observable<User> {
    // Primary: AuthController `/api/auth/me` (as per backend routes)
    const primaryUrl = `${environment.USERS_API}/api/auth/me`;
    // Fallback: older route pattern `/api/users/me`
    const fallbackUrl = `${this.baseUrl}/me`;
    return this.http.get<User>(primaryUrl).pipe(
      catchError((err) => {
        if (err?.status === 404 || err?.status === 405) {
          return this.http.get<User>(fallbackUrl);
        }
        return throwError(() => err);
      })
    );
  }
}


