import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { Toast } from '../interfaces/toast';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  toastTypeClass(type?: Toast['type']) {
    if (!type) return 'toast-info';
    return `toast-${type}`;
  }

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }
}
