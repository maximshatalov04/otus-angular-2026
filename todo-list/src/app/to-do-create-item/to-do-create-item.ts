import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { MatIconModule } from "@angular/material/icon";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { ToastService } from '../services/toast-service';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

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

  private readonly formDirective = viewChild.required(FormGroupDirective);
  
  onSubmit() {
    if (this.form.invalid)
      return;
    
    this.submitting.set(true);

    const text = this.form.controls.text.value!;
    const description = this.form.controls.description.value;

    this.state.add({ text, description, status: 'InProgress' }).pipe(
      tap(() => this.submitting.set(true)),
      // После успешного создания сразу запрашиваем новый список
      switchMap(itemCreated => {
        this.toastService.show('New task is added', 'success');
        this.state.select(itemCreated.id);
        return this.state.load(); 
      })
      ,
      catchError(() => {
        this.toastService.show("Can't add the task", "error");
        return of(null); // of(null), чтобы поток не умирал
      }),
      finalize(() => this.submitting.set(false)))
      .subscribe(todos => {
        // Здесь уже есть обновлённый список todos
        this.formDirective().resetForm();
        if(todos)
          this.state.updateItems(todos);
      });
  }
}

