import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { STATUS_OPTIONS, ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-board-column',
  imports: [ToDoListItem],
  templateUrl: './board-column.html',
  styleUrl: './board-column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardColumn {
  readonly status = input.required<ToDoItemStatus>();
  readonly todos = input.required<ToDoItem[]>();

  readonly todosCount = computed(() => this.todos().length);
  readonly label = computed(() => STATUS_OPTIONS[this.status()]);
}
