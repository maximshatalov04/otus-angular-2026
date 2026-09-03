import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
    readonly #route = inject(ActivatedRoute);
    readonly state = inject(ToDoService);

    readonly id = toSignal(this.#route.paramMap.pipe(map((params) => params.get('id'))));
    readonly todo = computed(()=>this.state.visibleTodos().find(task=>task.id.toString() === this.id()));
}
