import { Component } from '@angular/core';
import { UIExamplesListComponent } from "../../../components/ui-examples-list/ui-examples-list.component";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [UIExamplesListComponent,NgbCarouselModule],
  templateUrl: './carousel.component.html',
  styles: ``
})
export class CarouselComponent {

}
