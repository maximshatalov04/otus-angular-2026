
export interface ToDoItem {
  id: string;
  text: string;
  description: string | undefined | null;
  status: ToDoItemStatus;
}

export type ToDoItemStatus = 'InProgress' | 'Completed';
export type StatusFilter = ToDoItemStatus | 'All';

export interface CreateToDoItemDto {
  text: string;
  description: string | undefined | null;
  status?: ToDoItemStatus;
}