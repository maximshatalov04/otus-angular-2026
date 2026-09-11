import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, linkedSignal, signal } from '@angular/core';
import { ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { MatIconModule } from '@angular/material/icon';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { finalize, take } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { ClickOutsideDirective } from '../directives/click-outside-directive';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule, MatIconModule, TemplatedButton, TooltipDirective, MatFormField, MatInputModule, MatCheckbox, ClickOutsideDirective],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  readonly state = inject(ToDoService);
  readonly toastService = inject(ToastService);
  readonly item = input.required<ToDoItem>();
  readonly isCompleted = linkedSignal<boolean>(() => this.item().status === 'Completed');
  readonly isInputEmpty = computed(() =>
    this.isEmpty(this.localText()),
  );
  readonly localText = signal<string>('');
  readonly textInEditModeId = signal(false);

  onItemDeleted(id: string) {
    this.state.delete(id).pipe(take(1))
      .subscribe(() => this.toastService.show("Task is deleted", "warning"));
  }

  onSetEditing() {
    this.localText.set(this.item().text);
    this.textInEditModeId.set(true);
  }

  onItemSaved() {
    const updatedItem = { ... this.item(), text: this.localText() };

    this.state.update(updatedItem).pipe(
      take(1),
      finalize(() => this.textInEditModeId.set(false)))
      .subscribe(() => this.toastService.show("Task is updated", "info"));
  }

  onStatusChanged() {
    const status: ToDoItemStatus = this.isCompleted() ? 'Completed' : 'InProgress';
    const updatedItem = { ... this.item(), status };

    this.state.update(updatedItem).pipe(
      take(1),
      finalize(() => this.textInEditModeId.set(false)))
      .subscribe(() => this.toastService.show("Task status is updated", "info"));
  }

  isEmpty(text: string | undefined) {
    if (text === undefined)
      return true;

    return !text || !text.trim();
  }
}
