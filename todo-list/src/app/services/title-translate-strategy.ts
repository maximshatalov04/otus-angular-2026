import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TitleTranslateStrategy extends TitleStrategy {
  readonly #translate = inject(TranslateService);
  readonly #title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(routerState);

    if (titleKey) {
      this.#translate.stream(titleKey).subscribe((translated) => {
        this.#title.setTitle(translated);
      });
    } else {
      this.#translate.stream('LAYOUT.APP_NAME').subscribe((translated) => {
        this.#title.setTitle(translated);
      });
    }
  }
}