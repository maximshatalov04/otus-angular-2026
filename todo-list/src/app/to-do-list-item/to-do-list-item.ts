import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ToDoItem } from '../interfaces/to-do-item';
import { MatIconModule } from '@angular/material/icon';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatIconModule, TemplatedButton, TooltipDirective],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  readonly state = inject(ToDoService)

  readonly item = input.required<ToDoItem | undefined>();
  readonly deletedItemId = output<number>();
  readonly selectedItemId = output<number>();

  onItemDeleted(id: number | undefined) {
    if (id != null) {
      this.state.delete(id);
    }
  }

  onItemSelected(id: number | undefined) {
    if (id != null) {
      this.state.select(id);
    }
  }
}
