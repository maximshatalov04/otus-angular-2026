import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({ 
  providedIn: 'root', 
})
export class ToastService {
  public readonly toasts = signal<Toast[]>([]);
  private idCounter = 0;

  showToast(message: string, type: Toast['type'] = 'info') {
    const id = this.idCounter++;
    const newToast: Toast = { id, message, type };

    this.toasts.update(list => [...list, newToast]);

    // Автоудаление через 3 секунды
    setTimeout(() => {
      this.dismiss(id);
    }, 3000);
  }

  dismiss(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  clearAll() {
    this.toasts.set([]);
  }
}