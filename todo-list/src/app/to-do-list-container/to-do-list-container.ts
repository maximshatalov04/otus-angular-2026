import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoService } from '../services/to-do-service';
import { Spinner } from '../ui/spinner/spinner';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToDoItemView } from '../to-do-item-view/to-do-item-view';
import { take } from 'rxjs';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, Spinner, ToDoItemView, RouterLink, RouterLinkActive],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListContainer implements OnInit {
  readonly state = inject(ToDoService);

  // Значение из маршрута
  id = input.required<string | undefined>();
  readonly selectedToDo = computed(() =>
    this.state.visibleTodos().find((task) => task.id === this.id()),
  );

  ngOnInit(): void {
    this.state.load().pipe(take(1))
      .subscribe();
  };
}
