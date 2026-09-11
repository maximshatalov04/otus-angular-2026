import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoList } from '../to-do-list/to-do-list';

@Component({
  selector: 'app-backlog',
  imports: [ToDoList],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backlog { }
