import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoItem } from '../interfaces/ToDoItem';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListContainer {

  readonly todos = input.required<ToDoItem[] | undefined>();
  readonly itemIdToDelete = output<number>();

  onItemDeleted(id: number) {
    this.itemIdToDelete.emit(id);
  }
}
