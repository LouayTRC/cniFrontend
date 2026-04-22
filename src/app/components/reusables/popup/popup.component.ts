import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Input() title: string = 'Confirmation';
  @Input() message: string = '';
  @Input() icon: string = 'bx bx-error-circle';
  @Input() type: 'danger' | 'warning' | 'info' = 'danger';

  @Input() visible: boolean = false;

  // 🔥 loader state controlled internally
  loading: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    if (this.loading) return;

    this.loading = true;
    this.confirm.emit();
  }

  onCancel() {
    if (this.loading) return;
    this.cancel.emit();
  }

  // 🔥 reset from parent when action finished
  reset() {
    this.loading = false;
  }
}