import { Component } from '@angular/core';
import { UIExamplesListComponent } from "../../../components/ui-examples-list/ui-examples-list.component";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordions',
  standalone: true,
  imports: [UIExamplesListComponent,NgbAccordionModule],
  templateUrl: './accordions.component.html',
  styles: ``
})
export class AccordionsComponent {

}
