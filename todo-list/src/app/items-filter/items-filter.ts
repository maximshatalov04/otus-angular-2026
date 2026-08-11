import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatLabel } from '@angular/material/input';
import { ToDoService } from '../services/to-do-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ToDoItemStatus } from '../interfaces/to-do-item';

@Component({
  selector: 'app-items-filter',
  imports: [FormsModule, MatLabel, MatFormFieldModule, MatSelect, MatOption],
  templateUrl: './items-filter.html',
  styleUrl: './items-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsFilter {
  readonly state = inject(ToDoService);

  onFilterChange(value: ToDoItemStatus | undefined ) {
    this.state.updateStatus(value)
  }
}
