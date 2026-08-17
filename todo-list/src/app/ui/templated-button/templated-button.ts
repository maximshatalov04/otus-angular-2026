import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-templated-button',
  templateUrl: './templated-button.html',
  styleUrl: './templated-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TemplatedButton {
  readonly isDisabled = input<boolean>(false);
  readonly bgColor = input<string>('#000000');
  readonly buttonType = input<ButtonType>('button');
  readonly hoverColor = input<string | undefined>(undefined);
  readonly clicked = output<void>();

  onButtonClicked(): void {
    this.clicked.emit();
  }
}
