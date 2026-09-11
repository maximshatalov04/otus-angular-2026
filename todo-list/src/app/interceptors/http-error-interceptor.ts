import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';
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
        message = `Клиентская ошибка: ${error.error.message}`;
      } else {
        message = error.status
          ? `Серверная ошибка: ${error.status} ${error.message}`
          : `Серверная ошибка: ${error.message}`;
      }

      console.error(message, error);

      // Возвращаем поток, который вызывает show(), а затем завершается.
      return toastService.show(message, 'error').pipe(
        // После показа тоста продолжаем поток с ошибкой для потребителя
        () => throwError(() => new Error(message))
      );
    }),
  );
};
