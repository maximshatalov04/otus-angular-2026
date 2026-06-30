import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { MatIconModule } from "@angular/material/icon";
import { ToDoItem } from '../interfaces/to-do-item';

@Component({
  selector: 'app-to-do-list-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, TemplatedButton, MatIconModule],
  templateUrl: './to-do-list-form.html',
  styleUrl: './to-do-list-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListForm {
  readonly taskToAdd = output<ToDoItem>();
  readonly newTaskText = signal<string>('');
  readonly newTaskDescription = signal<string>('');
  readonly isInputEmpty = computed(()=> 
    this.isEmpty(this.newTaskText()),
  );

  onItemAdded() {
    const text = this.newTaskText();
    const description = this.newTaskDescription();
    if (this.isEmpty(text)) {
      return;
    }

    this.taskToAdd.emit({ id: 0, text: text, description: description });
    this.newTaskText.set('');
    this.newTaskDescription.set('');
  }

  isEmpty(text:string){
    return !text || !text.trim(); 
  }
}
