
export interface ToDoItem {
  id: number;
  text: string;
  description: string | undefined | null;
  status: ToDoItemStatus;
}

export type ToDoItemStatus = 'InProgress' | 'Completed';

export interface CreateToDoItemDto {
  text: string;
  description: string | undefined | null;
  status?: ToDoItemStatus;
}