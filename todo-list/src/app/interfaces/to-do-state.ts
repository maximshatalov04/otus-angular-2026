import { StatusFilter, ToDoItem } from "./to-do-item";

export type StateError = string | undefined;

export interface ToDoState {
  todos: ToDoItem[];
  loading: boolean;
  selectedItemId?: number; 
  editModeId?: number; 
  filter: StatusFilter; 
  error: StateError; 
}