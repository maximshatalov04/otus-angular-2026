import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleBar } from '../title-bar/title-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [MatIcon, RouterOutlet, RouterLink, RouterLinkActive, TitleBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly #router = inject(Router);

  readonly title = toSignal(
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.#router.routerState.root;
        // Получаем первый элемент маршрута.
        if (route.firstChild) route = route.firstChild;

        // Возвращаем его title из конфигурации
        return route.routeConfig?.title || '';
      }),
    ),
    { initialValue: '' },
  );
}
