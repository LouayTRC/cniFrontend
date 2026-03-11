import { Component } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { CommonModule } from '@angular/common'
import { TodoData } from '@views/widgets/data'

@Component({
  selector: 'widget-task',
  standalone: true,
  imports: [SimplebarAngularModule, CommonModule],
  templateUrl: './widget-task.component.html',
  styles: ``,
})
export class WidgetTaskComponent {
  taskList = TodoData
}
