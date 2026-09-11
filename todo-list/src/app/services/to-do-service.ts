import { Injectable, computed, inject, signal } from '@angular/core';
import { ToDoState } from '../interfaces/to-do-state';
import { CreateToDoItemDto, ToDoItem } from '../interfaces/to-do-item';
import { ApiClient } from './api-client';
import { ToastService } from './toast-service';
import { catchError, EMPTY, finalize, Observable, switchMap, tap } from 'rxjs';
import { ToDoItemStatus, StatusFilter } from '../constants/item-statuses';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {

  readonly api = inject(ApiClient);
  readonly toastService = inject(ToastService);

  #state = signal<ToDoState>({
    todos: [],
    loading: true,
    filter: 'All',
    error: undefined,
  });

  readonly todos = computed(() => this.#state().todos);
  readonly visibleTodos = computed(() => {
    const todos = this.#state().todos;
    const selectedStatus = this.#state().filter;

    if (this.#state().filter === 'All')
      return todos;

    return todos?.filter(todo => todo.status === selectedStatus);
  });

  public readonly loading = computed(() => this.#state().loading);
  public readonly selectedStatus = computed(() => this.#state().filter);

  load(): Observable<ToDoItem[]> {
    this.#patch({ loading: true, error: undefined });

    return this.api.getTodos().pipe(
      tap((todos) => this.#patch({ todos })),
      catchError((error: Error): Observable<ToDoItem[]> => {
        this.#patch({ error: error.message });
        return this.toastService.show("Can't load todos", 'error').pipe(
          switchMap(() => EMPTY),
          catchError(() => EMPTY)
        );
      }),
      finalize(() => this.#patch({ loading: false })),
    );
  }


  public add(todo: CreateToDoItemDto): Observable<ToDoItem> {
    this.#patch({ loading: true, error: undefined });

    const newItem: CreateToDoItemDto = {
      text: todo.text.trim(),
      description: todo.description?.trim(),
      status: 'InProgress' as ToDoItemStatus,
    };

    return this.api.createTask(newItem).pipe(
      tap((created) =>
        this.#patch({
          // Точечное обновление вместо перезапроса всего списка:
          // сервер уже вернул созданную задачу, второй GET не нужен.
          todos: [...this.#state().todos, created],
        }),
      ),
      catchError((error: Error): Observable<ToDoItem> => {
        this.#patch({ error: error.message });
        return this.toastService.show("Can't add the task", 'error').pipe(
          switchMap(() => EMPTY),
          catchError(() => EMPTY)
        );
      }),
      finalize(() => this.#patch({ loading: false })),
    );
  }

  public delete(id: string): Observable<void> {
    this.#patch({ loading: true, error: undefined });

    return this.api.deleteTask(id).pipe(
      tap(() =>
        this.#patch({
          todos: this.#state().todos.filter((task) => task.id !== id),
        })),
      catchError((error: Error): Observable<void> => {
        this.#patch({ error: error.message });
        return this.toastService.show("Can't delete the task", 'error').pipe(
          switchMap(() => EMPTY),
          catchError(() => EMPTY)
        );
      }),
      finalize(() => this.#patch({ loading: false })),
    );
  }

  public update(updatedItem: ToDoItem): Observable<ToDoItem> {
    this.#patch({ loading: true, error: undefined });
    const itemToChange = { ...updatedItem };

    if (itemToChange.description) {
      itemToChange.description = itemToChange.description.trim();
    }
    itemToChange.text = itemToChange.text.trim();

    return this.api.updateTask(itemToChange.id, itemToChange).pipe(
      tap(
        (updated) =>
          this.#patch({
            todos: this.#state().todos.map((task) =>
              task.id === updated.id ? updated : task,
            ),
          })),
      catchError((error: Error): Observable<ToDoItem> => {
        this.#patch({ error: error.message });
        return this.toastService.show("Can't update the task", 'error').pipe(
          switchMap(() => EMPTY),
          catchError(() => EMPTY)
        );
      }),
      finalize(() => this.#patch({ loading: false })),
    );
  }

  setFilter(filter: StatusFilter): void {
    this.#patch({ filter });
  }

  #patch(part: Partial<ToDoState>): void {
    this.#state.update((state) => ({ ...state, ...part }));
  }
}

