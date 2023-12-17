import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalLoadingService } from 'src/app/core/services/GlobalLoadingService/GlobalLoadingService.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private globalLoadingService: GlobalLoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalLoadingService.startLoading();
    return next.handle(request).pipe(
      finalize(() => this.globalLoadingService.stopLoading())
    );
  }
}
