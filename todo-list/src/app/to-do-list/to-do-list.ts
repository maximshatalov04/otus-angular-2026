import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToDoListTitle } from '../to-do-list-title/to-do-list-title';
import { ToDoListForm } from '../to-do-list-form/to-do-list-form';
import { ToDoListContainer } from '../to-do-list-container/to-do-list-container';
import { ToDoItem } from '../interfaces/to-do-item';

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoListTitle, ToDoListContainer, ToDoListForm],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToDoList {
  todos = signal<ToDoItem[]>([
    { id: 1, text: 'Lorem ipsum dolor sit amet consectetur.', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores eum rerum nulla! Inventore recusandae tempora quisquam, obcaecati ea at quia praesentium. Impedit cumque sint temporibus blanditiis exercitationem, nemo eligendi.' },
    { id: 2, text: 'Reprehenderit magnam nobis tempore ratione quasi?', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
    { id: 3, text: 'Ipsum delectus dicta reprehenderit illum enim!?', description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
    { id: 4, text: 'Eum explicabo quaerat reprehenderit?', description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?.' },
  ]);
  readonly selectedItemId = signal<number|undefined>(undefined);

  onItemDeleted(itemId: number) {
    this.todos.update(currentItems =>
      currentItems.filter(item => item.id !== itemId),
    );
  };

  onTaskToAdd(itemToAdd: ToDoItem) {
    const currentList = this.todos();
    const maxId = currentList.length === 0
      ? 0
      : currentList.reduce((max, item) => (item.id > max ? item.id : max), 0);

    const newItem = { id: maxId + 1, text: itemToAdd.text.trim(), description: itemToAdd.description?.trim() };
    this.todos.update(list => [
      ...list,
      newItem,
    ]);

    this.selectedItemId.set(newItem.id);
  }
}
