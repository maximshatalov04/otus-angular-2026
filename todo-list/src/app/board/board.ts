import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do-service';
import { Spinner } from '../ui/spinner/spinner';
import { BoardColumn } from '../board-column/board-column';
import { take } from 'rxjs';
import { FilterByStatusPipe } from '../pipes/filter-by-status';
import { STATUS_ORDER } from '../constants/item-statuses';

@Component({
  selector: 'app-board',
  imports: [Spinner, BoardColumn, FilterByStatusPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board implements OnInit {
  readonly state = inject(ToDoService);
  readonly statusOrder = STATUS_ORDER;

  ngOnInit(): void {
    this.state.load().pipe(take(1)).subscribe();
  }
}
