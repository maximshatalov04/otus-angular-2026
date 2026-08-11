import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { MatIconModule } from "@angular/material/icon";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'app-to-do-create-item',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TemplatedButton, MatIconModule, TooltipDirective],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {
  readonly state = inject(ToDoService);
  readonly toastService = inject(ToastService);
  readonly submitting = signal(false);

  readonly form = new FormGroup({
    text : new FormControl('', [Validators.required, Validators.minLength(3)]),
    description : new FormControl(''),
  });

  onSubmit() {
    if (this.form.invalid)
      return;
    
    this.submitting.set(true);

    const text = this.form.controls.text.value!;
    const description = this.form.controls.description.value;
    const newItemId = this.state.add({ text: text, description: description, status: 'InProgress'});

    this.state.select(newItemId);

    this.form.reset();
    this.submitting.set(false);
  }
}
