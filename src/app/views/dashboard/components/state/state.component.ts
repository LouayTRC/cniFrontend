import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { statData } from '@views/dashboard/data';

@Component({
  selector: 'dashboard-state',
  standalone: true,
  imports: [],
  templateUrl: './state.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StateComponent {
stateList=statData
}
