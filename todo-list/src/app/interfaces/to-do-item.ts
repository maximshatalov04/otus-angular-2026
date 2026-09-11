import { ToDoItemStatus } from "../constants/item-statuses";

export interface ToDoItem {
  id: string;
  text: string;
  description: string | undefined | null;
  status: ToDoItemStatus;
}

export interface CreateToDoItemDto {
  text: string;
  description: string | undefined | null;
  status?: ToDoItemStatus;
}