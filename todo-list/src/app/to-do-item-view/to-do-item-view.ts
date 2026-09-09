import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { ToDoStatusBar } from '../to-do-status-bar/to-do-status-bar';
import { ToDoService } from '../services/to-do-service';
import { ToastService } from '../services/toast-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { ClickOutsideDirective } from '../directives/click-outside-directive';
import { TemplatedButton } from '../ui/templated-button/templated-button';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TooltipDirective } from "../directives/tooltip";
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-to-do-item-view',
  imports: [ToDoStatusBar, MatFormField, ClickOutsideDirective, TemplatedButton, FormsModule, MatIcon, TooltipDirective, MatInput],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  readonly #destroyRef = inject(DestroyRef);
  readonly #state = inject(ToDoService);
  readonly #toastService = inject(ToastService);

  readonly todo = input.required<ToDoItem>();
  readonly textInEditModeId = signal(false);
  readonly descriptionInEditModeId = signal(false);
  readonly localText = signal<string>('');
  readonly localDescription = signal<string | null | undefined>('');
  readonly isTextEmpty = computed(() =>
    this.isEmpty(this.localText()),
  );

  onStatusChanged(status: ToDoItemStatus) {
    console.log("STATUS: ", status);

    const updatedItem = { ... this.todo(), status };

    this.#state.update(updatedItem).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.#state.setEditMode(undefined)))
      .subscribe(() => this.#toastService.show("Task status is updated", "info"));
  }

  onSetTextEditing() {
    this.localText.set(this.todo().text);
    this.textInEditModeId.set(true);
  }

  onSetDescriptionEditing() {
    this.localDescription.set(this.todo().description);
    this.descriptionInEditModeId.set(true);
  }

  onTextSaved() {
    const updatedItem = { ... this.todo(), text: this.localText() };

    this.#state.update(updatedItem).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.textInEditModeId.set(false)))
      .subscribe(() => this.#toastService.show("Task is updated", "info"));
  }

  onDescriptionSaved() {
    const updatedItem = { ... this.todo(), description: this.localDescription() };

    this.#state.update(updatedItem).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.descriptionInEditModeId.set(false)))
      .subscribe(() => this.#toastService.show("Task is updated", "info"));
  }

  isEmpty(text: string | undefined) {
    if (text === undefined)
      return true;

    return !text || !text.trim();
  }
}
