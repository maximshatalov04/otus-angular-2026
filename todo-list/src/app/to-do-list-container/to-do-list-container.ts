import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoService } from '../services/to-do-service';
import { Spinner } from '../ui/spinner/spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, Spinner],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class ToDoListContainer implements OnInit {
  readonly state = inject(ToDoService);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.state.load().pipe(
      takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  };
}
