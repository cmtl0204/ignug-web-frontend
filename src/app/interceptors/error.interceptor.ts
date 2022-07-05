import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CoreService} from '@services/core';
import {MessageService} from '@services/core';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private coreService: CoreService, private messageService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.coreService.showLoad();
    return next.handle(request).pipe(
      tap((response) => {
        this.coreService.hideLoad();
      }),
      catchError(error => {
        // this.appService.dismissLoading();
        this.messageService.error(error);
        this.coreService.hideLoad();
        return throwError(error);
      }));
  }
}
