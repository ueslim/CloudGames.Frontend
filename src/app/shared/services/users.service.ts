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
  // outros campos podem ser adicionados conforme necessário
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
  private readonly baseUrl = `${environment.USERS_API}`;

  constructor(private http: HttpClient) {}

  // Cadastro de usuário
  register(payload: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users`, payload);
  }

  // Autenticação (login)
  authenticate(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/users/authenticate`, payload);
  }

  // Obter usuário logado
  getMe(): Observable<User> {
    // Rota principal: AuthController `/api/auth/me`
    const primaryUrl = `${this.baseUrl}/auth/me`;
    // Fallback: rota mais antiga `/api/users/me`
    const fallbackUrl = `${this.baseUrl}/users/me`;

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