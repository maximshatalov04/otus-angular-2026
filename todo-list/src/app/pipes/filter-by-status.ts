import { Pipe, PipeTransform } from "@angular/core";
import { ToDoItem } from "../interfaces/to-do-item";
import { ToDoItemStatus } from "../constants/item-statuses";

@Pipe({
    name: 'filterByStatus',
    standalone: true,
})
export class FilterByStatusPipe implements PipeTransform {
    transform(todos: ToDoItem[], status: ToDoItemStatus): ToDoItem[] {
        return todos.filter(todo => todo.status === status);
    }
}