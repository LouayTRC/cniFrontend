import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TransactionsList } from '@views/widgets/data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'widget-transaction',
  standalone: true,
  imports: [SimplebarAngularModule, CommonModule],
  templateUrl: './widget-transaction.component.html',
  styles: ``,
})
export class WidgetTransactionComponent {
  transactions = TransactionsList
}
