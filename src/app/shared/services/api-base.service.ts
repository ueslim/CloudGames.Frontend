import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  protected readonly baseUrl: string;
  protected readonly headers: HttpHeaders;

  constructor(protected http: HttpClient, endpoint: string) {
    this.baseUrl = `${environment[endpoint]}`;
    
    // Set up headers for Azure APIM
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': environment.APIM_SUBSCRIPTION_KEY || ''
    });
  }

  protected getHeaders(): HttpHeaders {
    return this.headers;
  }

  protected getUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
