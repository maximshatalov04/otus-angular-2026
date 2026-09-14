import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { TitleTranslateStrategy } from './services/title-translate-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withDebugTracing()
    ),
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
    provideTranslateService({
      lang: 'en', // текущий язык по умолчанию
      fallbackLang: 'en', // резервный язык (если перевод не найден)
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/', // папка, где лежат JSON-файлы
        suffix: '.json', // расширение файлов
      }),
    }),
    {
      provide: TitleStrategy,
      useExisting: TitleTranslateStrategy,
    },
  ],
};
