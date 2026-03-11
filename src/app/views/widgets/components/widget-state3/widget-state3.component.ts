import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { stat3Data, State2Data } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'widget-state3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-state3.component.html',
  styles: ``,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetState3Component {
  stateList = stat3Data
}
