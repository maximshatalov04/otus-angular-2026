import { Injectable, computed, inject, signal } from '@angular/core';
import { ToDoState } from '../interfaces/to-do-state';
import { CreateToDoItemDto, ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { ApiClient } from './api-client';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  readonly api = inject(ApiClient);
  readonly toastService = inject(ToastService);

  #state = signal<ToDoState>({
    todos: [],
    loading: true,
  });

  readonly todos = computed(() => {
    const todos = this.#state().todos;
    const selectedStatus = this.#state().selectedStatus;

    if (!this.#state().selectedStatus)
      return todos;

    return todos?.filter(todo => todo.status === selectedStatus);
  });

  public readonly loading = computed(() => this.#state().loading);
  public readonly selectedItem = computed(() =>
    this.todos()?.find(t => t.id === this.#state().selectedItemId));
  public readonly editModeId = computed(() => this.#state().editModeId);
  public readonly selectedStatus = computed(() => this.#state().selectedStatus);

  public load() {
    this.#state.update(state => ({
      ...state,
      loading: true,
    }));

    this.api.getTodos().subscribe({
      next: (data) => {
        this.#state.update(state => ({
          ...state,
          todos: data,
          loading: false,
        }));
      },
      error: () => {
        this.toastService.show("Can't load todos", "error");
        this.#state.update(state => ({
          ...state,
          loading: false,
        }))
      },
    });
  }

  public add(todo: CreateToDoItemDto):number {
    const newItem: CreateToDoItemDto = {
      text: todo.text.trim(),
      description: todo.description?.trim(),
      status: 'InProgress' as ToDoItemStatus,
    };
    let taskId = -1;
    
    this.api.createTask(newItem).subscribe({
      next: (itemCreated) => {
        this.toastService.show("New task is added", "success");
        taskId = itemCreated.id; 
        this.load(); // обновляем список
      },
      error: () => {
        this.toastService.show("Can't add the task", "error");
      },
    });

    return taskId;
  }

  public delete(id: number) {
    this.api.deleteTask(id).subscribe({
      next: () => {
        this.toastService.show("Task is deleted", "warning");
        this.load(); // обновляем список
      },
      error: () => {
        this.toastService.show("Can't delete the task", "error");
      },
    });
  }

  public select(id: number) {
    this.#state.update(state => ({
      ...state,
      selectedItemId: id,
      editModeId: undefined,
    }));
  }

  public update(updatedItem: ToDoItem) {
    const itemToChange = updatedItem;

    if(itemToChange.description){
      itemToChange.description = itemToChange.description.trim();
    }
    itemToChange.text = itemToChange.text.trim();

    this.api.updateTask(itemToChange.id, itemToChange).subscribe({
      next: () => {
        this.toastService.show("Task is updated", "info");
        this.load(); // обновляем список
      },
      error: () => {
        this.toastService.show("Can't update the task", "error");
      },
    });
  }

  public updateStatus(status: ToDoItemStatus | undefined) {
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

