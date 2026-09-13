import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleBar } from '../title-bar/title-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TooltipDirective } from '../directives/tooltip';

@Component({
  selector: 'app-layout',
  imports: [MatIcon,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TitleBar,
    TooltipDirective,
    TranslatePipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout implements OnInit {
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);
  readonly #currentLang = signal<string>(this.#translate.getBrowserLang() || 'eu');
  readonly buttonLabel = computed(() => {
    const currentLang = this.#currentLang();
    return currentLang === 'en' ? 'RU' : 'EN'
  });
  readonly title = toSignal(
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.#router.routerState.root;
        // Получаем первый элемент маршрута.
        if (route.firstChild) route = route.firstChild;

        // Возвращаем его title из конфигурации
        return route.routeConfig?.title as string || '';
      }),
      switchMap((titleKey) => this.#translate.stream(titleKey)),
    ),
    { initialValue: '' },
  );

  ngOnInit(): void {
    // Синхронизируем начальное значение
    this.#translate.use(this.#currentLang());
    console.log(this.#currentLang());
  }

  toggleLanguage() {
    const currentLang = this.#currentLang();
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    this.#translate.use(nextLang);
    this.#currentLang.set(nextLang);
  }
}
