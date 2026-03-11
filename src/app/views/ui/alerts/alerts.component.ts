import { Component } from '@angular/core';
import { UIExamplesListComponent } from "@component/ui-examples-list/ui-examples-list.component";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { alert, type AlertType } from './data';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [UIExamplesListComponent,NgbAlertModule],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {
  title="Alert"
  alertData: AlertType[] = alert

  close(index: number) {
    this.alertData.splice(index, 1)
  }
}
