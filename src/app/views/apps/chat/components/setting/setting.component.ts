import { Component, inject } from '@angular/core';
import { NgbAccordionModule, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [SimplebarAngularModule,NgbAccordionModule],
  templateUrl: './setting.component.html',
  styles: ``
})
export class SettingComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

}
