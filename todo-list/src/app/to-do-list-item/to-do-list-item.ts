import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ToDoItem } from '../to-do-list/to-do-list';

@Component({
  selector: 'app-to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItem {
  readonly item = input.required<ToDoItem | undefined>();
  readonly itemIdToDelete = output<number>();

  onItemDeleted(id:number | undefined) {
    if (id)
      this.itemIdToDelete.emit(id)
  }
}
