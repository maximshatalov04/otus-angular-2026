import { Injectable, computed, inject, signal } from '@angular/core';
import { ToDoState } from '../interfaces/to-do-state';
import { CreateToDoItemDto, StatusFilter, ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { ApiClient } from './api-client';
import { ToastService } from './toast-service';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {

  readonly api = inject(ApiClient);
  readonly toastService = inject(ToastService);

  #state = signal<ToDoState>({
    todos: [],
    loading: true,
    selectedItemId: undefined,
    editModeId: undefined,
    filter: 'All',
    error: undefined,
  });

  readonly visibleTodos = computed(() => {
    const todos = this.#state().todos;
    const selectedStatus = this.#state().filter;

    if (this.#state().filter === 'All')
      return todos;

    return todos?.filter(todo => todo.status === selectedStatus);
  });

  public readonly loading = computed(() => this.#state().loading);
  public readonly selectedItem = computed(() =>
    this.visibleTodos()?.find(t => t.id === this.#state().selectedItemId));
  public readonly editModeId = computed(() => this.#state().editModeId);
  public readonly selectedStatus = computed(() => this.#state().filter);

  load(): Observable<ToDoItem[]> {
    this.#patch({ loading: true, error: undefined });

    return this.api.getTodos().pipe(
      tap((todos) => this.#patch({ todos })),
      catchError((error: Error) => {
        this.#patch({ error: error.message });
        this.toastService.show("Can't load todos", 'error')
        return EMPTY;
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
          selectedItemId: created.id,
        }),
      ),
      catchError((error: Error) => {
        this.#patch({ error: error.message });
        this.toastService.show("Can't add the task", "error")
        return EMPTY;
      }),
      finalize(() => this.#patch({ loading: false })),
    );
  }

  public delete(id: number): Observable<void> {
    this.#patch({ loading: true, error: undefined });
    
    return this.api.deleteTask(id).pipe(
      tap(() =>
        this.#patch({
          todos: this.#state().todos.filter((task) => task.id !== id),
          selectedItemId:
            this.#state().selectedItemId === id
              ? undefined
              : this.#state().selectedItemId,
        })),
        catchError((error: Error) => {
          this.#patch({ error: error.message });
          this.toastService.show("Can't delete the task", "error")
          return EMPTY;
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
      (updated)=>
        this.#patch({
          todos: this.#state().todos.map((task)=>
            task.id === updated.id ? updated : task,
        ),
        })),
        catchError((error: Error) =>{
          this.#patch({ error: error.message });
          this.toastService.show("Can't update the task", "error")
          return EMPTY;
        }),
        finalize(() => this.#patch({ loading:false})),
    );
  }

  setFilter(filter: StatusFilter): void {
    this.#patch({ filter });
  }

  public select(id: number): void {
    this.#patch({ 
      selectedItemId: id,
      editModeId: undefined, 
    });
  }

  public setEditMode(id: number | undefined) {
    this.#state.update(state => ({
      ...state,
      editModeId: id,
    }));
  }

  #patch(part: Partial<ToDoState>): void {
    this.#state.update((state) => ({ ...state, ...part }));
  }
}

