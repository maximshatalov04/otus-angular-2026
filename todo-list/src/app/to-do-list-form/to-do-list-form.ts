import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
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
  readonly taskToAdd = output<string>();
  newTaskText = signal<string>('');
  readonly isDisabled = computed(()=> 
    this.isEmpty(this.newTaskText())
  );

  onItemAdded() {
    const text = this.newTaskText();
    if (this.isEmpty(text)) {
      return; 
    }

    this.taskToAdd.emit(text);
    this.newTaskText.set('');
  }

  isEmpty(text:string){
    return !text || !text.trim(); 
  }
}
