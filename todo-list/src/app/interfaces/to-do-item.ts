
export interface ToDoItem {
  id: string;
  text: string;
  description: string | undefined | null;
  status: ToDoItemStatus;
}

export type ToDoItemStatus = 'ToDo' | 'InProgress' | 'Completed';
export type StatusFilter = ToDoItemStatus | 'All';

export const STATUS_OPTIONS: Record<ToDoItemStatus, string> = {
  ToDo: 'To Do',
  InProgress: 'In progress',
  Completed: 'Completed',
};

export const STATUS_FILTERS: Record<StatusFilter, string> = {
  All: 'All',
  ...STATUS_OPTIONS,
};

export interface CreateToDoItemDto {
  text: string;
  description: string | undefined | null;
  status?: ToDoItemStatus;
}