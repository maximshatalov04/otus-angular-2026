import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { MatIconModule } from "@angular/material/icon";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { ToastService } from '../services/toast-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ToDoItem } from '../interfaces/to-do-item';

@Component({
  selector: 'app-to-do-create-item',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TemplatedButton, MatIconModule, TooltipDirective],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly state = inject(ToDoService);
  readonly toastService = inject(ToastService);
  readonly submitting = signal(false);
  readonly form = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  });

  private readonly formDirective = viewChild.required(FormGroupDirective);

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.form.invalid)
      return;

    this.submitting.set(true);

    const text = this.form.controls.text.value!;
    const description = this.form.controls.description.value;

    this.state.add({ text, description, status: 'InProgress' }).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.submitting.set(false)))
      // Черновик сбрасывается ТОЛЬКО на успехе. Ошибка не доходит до next
      // (её погасил стор), поэтому при упавшем запросе текст остаётся в поле.
      .subscribe((todo: ToDoItem) => {
        this.toastService.show('New task is added', 'success');
        this.formDirective().resetForm();
        this.#router.navigate(['/backlog', todo.id]);
      });
  }
}

