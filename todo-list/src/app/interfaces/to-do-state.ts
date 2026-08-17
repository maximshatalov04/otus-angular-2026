import { ToDoItem, ToDoItemStatus } from "./to-do-item";

export interface ToDoState {
  todos?: ToDoItem[];
  loading: boolean;
  selectedItemId?: number; 
  editModeId?: number; 
  selectedStatus: ToDoItemStatus; 
}