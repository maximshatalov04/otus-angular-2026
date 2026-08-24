import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { ToDoItem, ToDoItemStatus } from '../interfaces/to-do-item';
import { MatIconModule } from '@angular/material/icon';
import { TemplatedButton } from "../ui/templated-button/templated-button";
import { TooltipDirective } from '../directives/tooltip';
import { ToDoService } from '../services/to-do-service';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule, MatIconModule, TemplatedButton, TooltipDirective, MatFormField, MatInputModule, MatCheckbox ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {

  readonly state = inject(ToDoService);
  readonly item = input.required<ToDoItem>();
  readonly isCompleted = linkedSignal<boolean>(() => this.item().status === 'Completed');
  readonly isInputEmpty = computed(()=> 
    this.isEmpty(this.localText()),
  );
  readonly localText = signal<string>('');

  onItemDeleted(id: number | undefined) {
    if (id != null) {
      this.state.delete(id).pipe(
        switchMap(()=> this.state.load()),
      )
      .subscribe(todos => {
        if(todos)
          this.state.updateItems(todos);
      });
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

  onItemSaved() {
    if(!this.item())
      return;
    
    const updatedItem = {... this.item(), text: this.localText()};
   
    this.state.update(updatedItem).pipe(
        switchMap(()=> this.state.load()),
        finalize(()=>this.state.setEditMode(undefined)),
      )
      .subscribe(todos => {
        if(todos)
          this.state.updateItems(todos);
      });
  }

  onStatusChanged() {
    if (!this.item())
      return;
    
    const status:ToDoItemStatus = this.isCompleted() ? 'Completed' : 'InProgress';
    const updatedItem = {... this.item(), status };
   
    this.state.update(updatedItem).pipe(
        switchMap(()=> this.state.load()),
        finalize(()=>this.state.setEditMode(undefined)),
      )
      .subscribe(todos => {
        if(todos)
          this.state.updateItems(todos);
      });
  }

  isEmpty(text:string | undefined){
    if (text === undefined)
      return true;
    
    return !text || !text.trim(); 
  }
}
