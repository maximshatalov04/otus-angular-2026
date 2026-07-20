import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({ 
  providedIn: 'root', 
})
export class ToastService {
  private _toasts: WritableSignal<Toast[]> = signal<Toast[]>([]);
  private idCounter = 0;

  public readonly toasts: Signal<Toast[]> = this._toasts.asReadonly();

  showToast(message: string, type: Toast['type'] = 'info') {
    const id = this.idCounter++;
    const newToast: Toast = { id, message, type };

    this._toasts.update(list => [...list, newToast]);

    // Автоудаление через 3 секунды
    setTimeout(() => {
      this.dismiss(id);
    }, 3000);
  }

  dismiss(id: number) {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  clearAll() {
    this._toasts.set([]);
  }
}