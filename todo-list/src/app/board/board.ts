import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do-service';
import { STATUS_OPTIONS, ToDoItemStatus } from '../interfaces/to-do-item';
import { Spinner } from '../ui/spinner/spinner';
import { KeyValuePipe } from '@angular/common';
import { BoardColumn } from '../board-column/board-column';
import { take } from 'rxjs';
import { FilterByStatusPipe } from '../pipes/filter-by-status';

@Component({
  selector: 'app-board',
  imports: [Spinner, KeyValuePipe, BoardColumn, FilterByStatusPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board implements OnInit {

  readonly state = inject(ToDoService);
  readonly statusOptions = STATUS_OPTIONS;
  readonly keepOrder = () => 0;

  ngOnInit(): void {
    this.state.load().pipe(take(1))
      .subscribe();
  };

  getStatus(optionKey: string): ToDoItemStatus {
    const status = optionKey as ToDoItemStatus; // теперь это безопасный ключ
    return status;
  }
}
