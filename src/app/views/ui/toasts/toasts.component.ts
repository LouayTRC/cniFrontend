import { Component, inject } from '@angular/core';
import { UIExamplesListComponent } from '@component/ui-examples-list/ui-examples-list.component';
import { ToastService } from '@core/services/toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toastsss',
  standalone: true,
  imports: [UIExamplesListComponent,NgbToastModule,ToastsContainer,FormsModule],
  templateUrl: './toasts.component.html',
  styles: ``
})
export class ToastsComponent {
  liveToast = false
  show = true
  show1 = true
  show2 = true
  show3 = true
  placement = true
  translucent = true
  toastPlacement: string = ''
  toastService = inject(ToastService);

  showStandard() {
    this.toastService.show({
      content: "See? Just like this.",
      delay: 10000,
      classname: 'standard',
    })
  }

  showStandard2() {
    this.toastService.show({
      content: 'Heads up, toasts will stack automatically',
      delay: 10000,
      classname: 'standard',
    })
  }

  close() {
    this.show = false
  }
}
