import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list-title',
  templateUrl: './to-do-list-title.html',
  styleUrl: './to-do-list-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListTitle {}
