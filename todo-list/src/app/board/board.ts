import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do-service';
import { STATUS_OPTIONS, ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { Spinner } from '../ui/spinner/spinner';
import { KeyValuePipe } from '@angular/common';
import { BoardColumn } from '../board-column/board-column';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board',
  imports: [Spinner, KeyValuePipe, BoardColumn],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board implements OnInit {
  readonly #destroyRef = inject(DestroyRef);

  readonly state = inject(ToDoService);
  readonly statusOptions = STATUS_OPTIONS;
  readonly keepOrder = () => 0;

  ngOnInit(): void {
    this.state.load().pipe(
      takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  };

  getStatus(optionKey: string): ToDoItemStatus {
    const status = optionKey as ToDoItemStatus; // теперь это безопасный ключ
    return status;
  }

  filterTodos(optionKey: string): ToDoItem[] {
    const status = optionKey as ToDoItemStatus;
    const todos = this.state.todos();

    if (todos)
      return todos?.filter(todo => todo.status === status);
    else
      return [];
  }
}
