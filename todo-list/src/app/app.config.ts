import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withDebugTracing(),
    ),
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
  ],
};
