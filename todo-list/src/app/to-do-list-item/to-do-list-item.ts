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
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../services/toast-service';
import { ClickOutsideDirective } from '../directives/click-outside-directive';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule, MatIconModule, TemplatedButton, TooltipDirective, MatFormField, MatInputModule, MatCheckbox, ClickOutsideDirective ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  readonly #destroyRef = inject(DestroyRef);
  readonly state = inject(ToDoService);
  readonly toastService = inject(ToastService);
  readonly item = input.required<ToDoItem>();
  readonly isCompleted = linkedSignal<boolean>(() => this.item().status === 'Completed');
  readonly isInputEmpty = computed(()=> 
    this.isEmpty(this.localText()),
  );
  readonly localText = signal<string>('');

  onItemDeleted(id: string ) {
    this.state.delete(id).pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.toastService.show("Task is deleted", "warning"));;
  }

  onSetEditing() {
    this.localText.set(this.item().text);
    this.state.setEditMode(this.item().id);
  }

  onItemSaved() {
    const updatedItem = {... this.item(), text: this.localText()};
   
    this.state.update(updatedItem).pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(()=>this.state.setEditMode(undefined)))
      .subscribe(() => this.toastService.show("Task is updated", "info"));
  }

  onStatusChanged() {
    const status: ToDoItemStatus = this.isCompleted() ? 'Completed' : 'InProgress';
    const updatedItem = { ... this.item(), status };

    this.state.update(updatedItem).pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => this.state.setEditMode(undefined)))
      .subscribe(() => this.toastService.show("Task status is updated", "info"));
  }

  isEmpty(text:string | undefined){
    if (text === undefined)
      return true;
    
    return !text || !text.trim(); 
  }
}
