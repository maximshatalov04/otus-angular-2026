import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-templated-button',
  imports: [],
  templateUrl: './templated-button.html',
  styleUrl: './templated-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatedButton {
  isDisabled = input<boolean>(false);
  bgColor = input<string>('#000000');
}
