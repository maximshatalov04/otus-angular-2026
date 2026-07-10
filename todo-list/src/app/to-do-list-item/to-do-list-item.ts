import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ToDoItem } from '../interfaces/to-do-item';
import { MatIconModule } from '@angular/material/icon';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule, MatIconModule, TemplatedButton, TooltipDirective, MatFormField, MatInputModule ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  readonly state = inject(ToDoService)
  readonly item = input.required<ToDoItem>();
  readonly isInputEmpty = computed(()=> 
    this.isEmpty(this.localText()),
  );
  readonly localText = signal<string>('');

  onItemDeleted(id: number | undefined) {
    if (id != null) {
      this.state.delete(id);
    }
  }

  onItemSelected(id: number | undefined) {
    if (id != null) {
      this.state.select(id);
    }
  }

  onSetEditing() {
    this.localText.set(this.item().text);
    this.state.setEditMode(this.item().id);
  }

  onTextChange(newText: string) {
    this.localText.set(newText);
  }

  onItemSaved() {
    const updatedItem = {... this.item(), text: this.localText()};
   
    this.state.update(updatedItem)
       this.state.setEditMode(undefined);
  }

  isEmpty(text:string | undefined){
    if (text === undefined)
      return true;
    
    return !text || !text.trim(); 
  }
}
