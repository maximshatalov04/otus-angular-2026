import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ToastService } from '../services/toast-service';
import { inject, } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const HttpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Неизвестная ошибка API';

      if (error.error instanceof ErrorEvent) {
        // Клиентская ошибка (синтаксис, сеть и т.п.)
        message = `Клиентская ошибка: ${error.error.message}`;
      } else {
        // Серверная ошибка (HTTP статус, тело ответа)
        message = error.status
          ? `Серверная ошибка: ${error.status} ${error.message}`
          : `Серверная ошибка: ${error.message}`;
      }

      console.error(message, error);
      toastService.show(message, 'error');

      return throwError(() => new Error(message));
    })
  );
};
