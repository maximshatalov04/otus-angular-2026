import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  readonly state = inject(ToDoService);

  readonly id = input.required<string>();
  readonly todo = computed(() =>
    this.state.visibleTodos().find((task) => task.id === this.id()),
  );
}
