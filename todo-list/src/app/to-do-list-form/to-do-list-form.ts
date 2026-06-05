import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-form',
  imports: [ FormsModule ],
  templateUrl: './to-do-list-form.html',
  styleUrl: './to-do-list-form.scss',
})
export class ToDoListForm {
  task: string | undefined;
}
