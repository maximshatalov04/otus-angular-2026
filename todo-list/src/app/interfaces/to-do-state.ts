import { StatusFilter, ToDoItem } from "./to-do-item";

export type StateError = string | undefined;

export interface ToDoState {
  todos: ToDoItem[];
  loading: boolean;
  editModeId?: string; 
  filter: StatusFilter; 
  error: StateError; 
}