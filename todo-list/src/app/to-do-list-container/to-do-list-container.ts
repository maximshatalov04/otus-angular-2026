import { Component } from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
})
export class ToDoListContainer {}
