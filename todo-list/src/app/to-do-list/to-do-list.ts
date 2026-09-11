import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoCreateItem } from '../to-do-create-item/to-do-create-item';
import { ToastComponent } from "../toast-component/toast-component";
import { ItemsFilter } from "../items-filter/items-filter";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoCreateItem, ToastComponent, ItemsFilter, RouterOutlet],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToDoList { }
