import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatLabel } from '@angular/material/input';
import { ToDoService } from '../services/to-do-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FILTER_ORDER, STATUS_FILTERS, ToDoItemStatus } from '../constants/item-statuses';

@Component({
  selector: 'app-items-filter',
  imports: [FormsModule, MatLabel, MatFormFieldModule, MatSelect, MatOption],
  templateUrl: './items-filter.html',
  styleUrl: './items-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsFilter {
  readonly state = inject(ToDoService);
  readonly filterOptions = STATUS_FILTERS;
  readonly filterOrder = FILTER_ORDER;

  onFilterChange(value: ToDoItemStatus) {
    const selectedValue = value;
    console.log('Selected filter:', selectedValue);

    this.state.setFilter(selectedValue);
  }
}
