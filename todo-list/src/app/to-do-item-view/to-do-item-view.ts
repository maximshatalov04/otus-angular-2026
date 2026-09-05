import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToDoItem } from '../interfaces/to-do-item';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  readonly todo = input.required<ToDoItem>();
}
