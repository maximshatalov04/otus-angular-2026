import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject} from '@angular/core';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-list-container',
  imports: [ToDoListItem, MatProgressSpinner],
  templateUrl: './to-do-list-container.html',
  styleUrl: './to-do-list-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListContainer implements OnInit, OnDestroy {
  readonly state = inject(ToDoService);

  private timerId: number | null = null;

  ngOnInit(): void {
    this.timerId = setTimeout(() => {
      this.state.setLoaded();
    }, 500);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
