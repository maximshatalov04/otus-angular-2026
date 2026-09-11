import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  imports: [],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBar { }
