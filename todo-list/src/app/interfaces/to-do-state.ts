import { StatusFilter } from "../constants/item-statuses";
import { ToDoItem } from "./to-do-item";

export type StateError = string | undefined;

export interface ToDoState {
  todos: ToDoItem[];
  loading: boolean;
  filter: StatusFilter;
  error: StateError;
}