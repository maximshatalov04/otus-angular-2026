import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { STATUS_OPTIONS, ToDoItemStatus } from '../interfaces/to-do-item';
import { KeyValuePipe } from '@angular/common';
import { TooltipDirective } from "../directives/tooltip";

@Component({
  selector: 'app-to-do-status-bar',
  imports: [KeyValuePipe, TooltipDirective, TooltipDirective],
  templateUrl: './to-do-status-bar.html',
  styleUrl: './to-do-status-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoStatusBar {
  readonly status = input<ToDoItemStatus>();
  readonly statusChanged = output<ToDoItemStatus>();

  readonly statusOptions = STATUS_OPTIONS;
  readonly keepOrder = () => 0;

  onStatusChanged(rawStatus: string) {
    if (!(rawStatus in STATUS_OPTIONS))
      return;

    const status = rawStatus as ToDoItemStatus; // теперь это безопасный ключ
    if (status === this.status())
      return;

    this.statusChanged.emit(status);
  }
}
