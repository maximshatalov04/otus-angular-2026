import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TooltipDirective } from "../directives/tooltip";
import { STATUS_OPTIONS, STATUS_ORDER, ToDoItemStatus } from '../constants/item-statuses';

@Component({
  selector: 'app-to-do-status-bar',
  imports: [TooltipDirective, TooltipDirective],
  templateUrl: './to-do-status-bar.html',
  styleUrl: './to-do-status-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoStatusBar {
  readonly status = input<ToDoItemStatus>();
  readonly statusChanged = output<ToDoItemStatus>();

  readonly statusOptions = STATUS_OPTIONS;
  readonly statusOrder = STATUS_ORDER;

  onStatusChanged(status: ToDoItemStatus) {
    this.statusChanged.emit(status);
  }
}
