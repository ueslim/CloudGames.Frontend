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
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role?: string;
  isActive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  // A baseUrl já é '.../users'
  private readonly baseUrl = `${environment.USERS_API}`;

  constructor(private http: HttpClient) {}

  // Cadastro de usuário
  register(payload: RegisterRequest): Observable<void> {
    // CORRIGIDO: A rota para criar um usuário é o próprio /users (a baseUrl).
    // Antes estava: `${this.baseUrl}/users`, o que gerava /users/users
    return this.http.post<void>(this.baseUrl, payload);
  }

  // Autenticação (login)
  authenticate(payload: AuthRequest): Observable<AuthResponse> {
    // CORRIGIDO: Removemos o /users duplicado.
    // Antes estava: `${this.baseUrl}/users/authenticate`, o que gerava /users/users/authenticate
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticate`, payload);
  }

  // Obter usuário logado
  getMe(): Observable<User> {
    // Rota principal: AuthController `/api/auth/me`
    // CORRIGIDO: A rota de autenticação não deve ter /users. Trocamos /users por /auth.
    // Antes estava: `${this.baseUrl}/auth/me`, o que gerava /users/auth/me
    const primaryUrl = this.baseUrl.replace('/users', '/auth/me');
    
    // Fallback: rota mais antiga `/api/users/me`
    // CORRIGIDO: Removemos o /users duplicado.
    // Antes estava: `${this.baseUrl}/users/me`, o que gerava /users/users/me
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

  // Obter usuário por ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Obter todos os usuários (Admin only)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Atualizar usuário
  updateUser(id: string, payload: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, payload);
  }
}