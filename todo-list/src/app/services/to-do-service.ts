import { Injectable, computed, inject, signal } from '@angular/core';
import { ToDoState } from '../interfaces/to-do-state';
import { CreateToDoItemDto, ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { ApiClient } from './api-client';
import { ToastService } from './toast-service';
import { finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {

  readonly api = inject(ApiClient);
  readonly toastService = inject(ToastService);

  #state = signal<ToDoState>({
    todos: [],
    loading: true,
    selectedStatus: 'All',
  });

  readonly todos = computed(() => {
    const todos = this.#state().todos;
    const selectedStatus = this.#state().selectedStatus;

    if (this.#state().selectedStatus === 'All')
      return todos;

    return todos?.filter(todo => todo.status === selectedStatus);
  });

  public readonly loading = computed(() => this.#state().loading);
  public readonly selectedItem = computed(() =>
    this.todos()?.find(t => t.id === this.#state().selectedItemId));
  public readonly editModeId = computed(() => this.#state().editModeId);
  public readonly selectedStatus = computed(() => this.#state().selectedStatus);

  load(): Observable<ToDoItem[]> {
    this.#state.update(state => ({ ...state, loading: true }));

    return this.api.getTodos().pipe(
      tap({
        error: () => this.toastService.show("Can't load todos", 'error'),
      }),
      finalize(() => this.#state.update(state => ({ ...state, loading: false }))),
    );
  }

  updateItems(todos: ToDoItem[]): void {
    this.#state.update(state => ({ ...state, todos }));
  }

  public add(todo: CreateToDoItemDto): Observable<ToDoItem> {
    const newItem: CreateToDoItemDto = {
      text: todo.text.trim(),
      description: todo.description?.trim(),
      status: 'InProgress' as ToDoItemStatus,
    };

    return this.api.createTask(newItem);
  }

  public delete(id: number) {
    return this.api.deleteTask(id).pipe(
      tap({
        next: () => this.toastService.show("Task is deleted", "warning"),
        error: () => this.toastService.show("Can't delete the task", "error")
      })
    );
  }

  public select(id: number) {
    this.#state.update(state => ({
      ...state,
      selectedItemId: id,
      editModeId: undefined,
    }));
  }

  public update(updatedItem: ToDoItem): Observable<ToDoItem> {
    const itemToChange = { ...updatedItem };

    if (itemToChange.description) {
      itemToChange.description = itemToChange.description.trim();
    }
    itemToChange.text = itemToChange.text.trim();

    return this.api.updateTask(itemToChange.id, itemToChange).pipe(
      tap({
        next: () => this.toastService.show("Task is updated", "info"),
        error: () => this.toastService.show("Can't update the task", "error")
      })
    );
  }

  public updateStatus(status: ToDoItemStatus) {
    this.#state.update(state => ({
      ...state,
      selectedStatus: status,
    }));
  }

  public setEditMode(id: number | undefined) {
    this.#state.update(state => ({
      ...state,
      editModeId: id,
    }));
  }
}

