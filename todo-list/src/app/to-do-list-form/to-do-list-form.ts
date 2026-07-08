import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { MatIconModule } from "@angular/material/icon";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-list-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, TemplatedButton, MatIconModule, TooltipDirective],
  templateUrl: './to-do-list-form.html',
  styleUrl: './to-do-list-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListForm {
  readonly state = inject(ToDoService);
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

    const newItemId = this.state.add({ text: text, description: description });
    this.state.select(newItemId);

    this.newTaskText.set('');
    this.newTaskDescription.set('');
  }

  isEmpty(text:string){
    return !text || !text.trim(); 
  }
}
