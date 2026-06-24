import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-templated-button',
  templateUrl: './templated-button.html',
  styleUrl: './templated-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatedButton {
  readonly isDisabled = input<boolean>(false);
  readonly bgColor = input<string>('#000000');
  readonly clicked = output<void>();

  onButtonClicked(): void {
    this.clicked.emit();
  }
}
