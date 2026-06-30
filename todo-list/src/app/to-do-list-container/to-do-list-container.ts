import { ChangeDetectionStrategy, Component, input, output, signal, OnInit, OnDestroy, effect} from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoItem } from '../interfaces/to-do-item';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, MatProgressSpinner],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListContainer implements OnInit, OnDestroy {

  readonly todos = input.required<ToDoItem[] | undefined>();
  readonly itemIdToSelect = input<number>();
  readonly itemIdToDelete = output<number>();
  readonly isLoading = signal<boolean>(true);
  readonly selectedItem = signal<ToDoItem | undefined>(undefined);
  readonly selectedItemChanged = effect(() => {
    const id = this.itemIdToSelect();
    
    if (id != null) {
      this.selectItem(id);
    }
  });
  private timerId: number | null = null;

  itemDeleted(id: number) {
    this.itemIdToDelete.emit(id);
  }

  itemSelected(id: number) {
    this.selectItem(id);
  }

  selectItem(id: number) {
      const todos = this.todos();

      if (todos) {
        const item = todos.find(todo => todo.id === id);
        this.selectedItem.set(item);
      }
    }

  ngOnInit(): void {
    this.timerId = setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
