import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currentYear } from '@common/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  currentYear = currentYear
}
