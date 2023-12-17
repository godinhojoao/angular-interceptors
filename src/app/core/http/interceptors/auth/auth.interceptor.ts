import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludedUrls = ['github', 'URL2'];
    if (excludedUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': 'Bearer YOUR_TOKEN'
      }
    });
    return next.handle(modifiedRequest);
  }
}
