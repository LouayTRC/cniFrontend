import { Component } from '@angular/core';
import { browserList } from '@views/dashboard/data';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'browsers',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './browsers.component.html',
  styles: ``
})
export class BrowsersComponent {
  browserData = browserList
}
