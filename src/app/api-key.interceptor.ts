import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = '16460738e1e44a0e8ca0bf32ced3858e'; // <-- COLOQUE SUA CHAVE REAL AQUI, ENTRE AS ASPAS

    const isApiUrl = request.url.startsWith('https://cloudgames-apim.azure-api.net');

    if (apiKey && isApiUrl) {
      const authorizedRequest = request.clone({
        setHeaders: {
          'Ocp-Apim-Subscription-Key': apiKey
        }
      });
      return next.handle(authorizedRequest);
    }

    return next.handle(request);
  }
}