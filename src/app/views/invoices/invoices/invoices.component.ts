import { Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { InvoicesData, type InvoiceType } from '../data';
import { TableService } from '@core/services/table.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [NgbPaginationModule,FormsModule,RouterLink,DatePipe,CommonModule],
  templateUrl: './invoices.component.html',
  styles: ``
})
export class InvoicesComponent {
  invoices$: Observable<InvoiceType[]>
  total$: Observable<number>

  public tableService = inject(TableService<InvoiceType>)

  constructor() {
    this.invoices$ = this.tableService.items$
    this.total$ = this.tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(InvoicesData, 10)
  }
}
