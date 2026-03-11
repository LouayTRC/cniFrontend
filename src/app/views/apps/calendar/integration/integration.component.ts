import { Component } from '@angular/core';
import { IntegrationData } from './data';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [],
  templateUrl: './integration.component.html',
  styles: ``
})
export class IntegrationComponent {
  integrationList = IntegrationData
}
