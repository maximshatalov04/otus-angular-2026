import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-to-do-list-form',
  imports: [ FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './to-do-list-form.html',
  styleUrl: './to-do-list-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListForm {
  task: string | undefined;
  readonly isDisabled = input.required<boolean>();
  readonly taskToAdd = output<string>();

  onItemAdded() {
    const text = this.task;
    if (!text || !text.trim()) {
      return; 
    }

    console.log(text);
    this.taskToAdd.emit(text);
    this.task = "";
  }
}
