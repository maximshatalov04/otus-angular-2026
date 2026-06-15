import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem {
   task: string = "Выполни меня скорее"
}
