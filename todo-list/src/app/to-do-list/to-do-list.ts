import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToDoListTitle } from '../to-do-list-title/to-do-list-title';
import { ToDoListForm } from '../to-do-list-form/to-do-list-form';
import { ToDoListContainer } from '../to-do-list-container/to-do-list-container';
import { ToDoItem } from '../interfaces/ToDoItem';

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoListTitle, ToDoListContainer, ToDoListForm],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToDoList {
  todos = signal<ToDoItem[]> ([
    { id: 1, text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 2, text: 'Reprehenderit magnam nobis tempore ratione quasi?' },
    { id: 3, text: 'Ipsum delectus dicta reprehenderit illum enim!?' },
    { id: 4, text: 'Eum explicabo quaerat reprehenderit?' },
  ]);

  onItemDeleted(itemId: number) {
     this.todos.update(currentItems => 
        currentItems.filter(item => item.id !== itemId)
      );
  };

  onTaskToAdd(task: string) {
     console.log("Trying to add: ", task);
        const currentList = this.todos();
        const maxId = currentList.length === 0 
          ? 0 
          : currentList.reduce((max, item) => (item.id > max ? item.id : max), 0);
    
        const newItem = { id: maxId + 1, text: task.trim()};
        this.todos.update(list => [
          ...list,
          newItem
        ]);
  }
}
