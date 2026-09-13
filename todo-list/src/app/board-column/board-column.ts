import {
  ChangeDetectionStrategy, Component, computed, inject, input,
} from '@angular/core';
import { ToDoItem } from '../interfaces/to-do-item';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { STATUS_OPTIONS, ToDoItemStatus } from '../constants/item-statuses';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board-column',
  imports: [ToDoListItem],
  templateUrl: './board-column.html',
  styleUrl: './board-column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardColumn {
  readonly #translate = inject(TranslateService);
  readonly status = input.required<ToDoItemStatus>();
  readonly todos = input.required<ToDoItem[]>();

  readonly todosCount = computed(() => this.todos().length);
  readonly label = computed(() => this.#translate.instant(STATUS_OPTIONS[this.status()]));
}
