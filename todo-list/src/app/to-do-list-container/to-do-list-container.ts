import { ChangeDetectionStrategy, Component, input, output, signal, OnInit} from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoItem } from '../interfaces/ToDoItem';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, MatProgressSpinner],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListContainer implements OnInit{
  readonly todos = input.required<ToDoItem[] | undefined>();
  readonly itemIdToDelete = output<number>();
  readonly isLoading = signal<boolean>(true);
  private timerId: number | null = null;

  itemDeleted(id: number) {
    this.itemIdToDelete.emit(id);
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
