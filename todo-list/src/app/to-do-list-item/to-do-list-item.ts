import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ToDoItem } from '../interfaces/ToDoItem';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItem {
  readonly item = input.required<ToDoItem | undefined>();
  readonly itemIdToDelete = output<number>();

  onItemDeleted(id:number | undefined) {
    if (id != null)
      this.itemIdToDelete.emit(id)
  }
}
