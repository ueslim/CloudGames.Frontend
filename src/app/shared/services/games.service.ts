import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface GameDto {
  id: string;
  title: string;
  description: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  genre: string;
  price: number;
  coverImageUrl: string;
  tags: string[];
}

export interface CreateGameDto {
  title: string;
  description: string;
  developer: string;
  publisher: string;
  releaseDate: Date;
  genre: string;
  price: number;
  coverImageUrl: string;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly baseUrl = environment.GAMES_API;

  constructor(private http: HttpClient) {}

  getAll(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(`${this.baseUrl}`);
  }

  // Temporary alias for backwards compatibility; prefer getAll()
  list(): Observable<GameDto[]> {
    return this.getAll();
  }

  getById(id: string): Observable<GameDto> {
    return this.http.get<GameDto>(`${this.baseUrl}/${id}`);
  }

  purchase(id: string): Observable<{ paymentId: string }> {
    return this.http.post<{ paymentId: string }>(`${this.baseUrl}/${id}/purchase`, {});
  }

  create(payload: CreateGameDto): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.baseUrl}`, payload);
  }
}


