import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ToDoService } from '../services/to-do-service';
import { Spinner } from '../ui/spinner/spinner';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { map } from 'rxjs';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, Spinner, RouterOutlet],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class ToDoListContainer implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);
  
  readonly state = inject(ToDoService);
  readonly selectedId = toSignal(
    this.#route.paramMap.pipe(
      map((params) => {
        const idStr = params.get('id');
        return idStr ? Number(idStr) : null;
      }),
    ),
    { requireSync: true },
  );
  
  ngOnInit(): void {
    this.state.load().pipe(
      takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  };
}
