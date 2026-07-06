import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoListTitle } from '../to-do-list-title/to-do-list-title';
import { ToDoListForm } from '../to-do-list-form/to-do-list-form';
import { ToDoListContainer } from '../to-do-list-container/to-do-list-container';

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoListTitle, ToDoListContainer, ToDoListForm],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToDoList {}
