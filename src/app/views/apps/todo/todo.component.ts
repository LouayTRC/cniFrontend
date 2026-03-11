import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import type { Observable } from 'rxjs';
import { TodoData, type TodoType } from './data';
import { TableService } from '@core/services/table.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,NgbPaginationModule,FormsModule],
  templateUrl: './todo.component.html',
  styles: ``
})
export class TodoComponent {
  todo$: Observable<TodoType[]>
  total$: Observable<number>

  public tableService = inject(TableService<TodoType>)

  constructor() {
    this.todo$ = this.tableService.items$
    this.total$ = this.tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(TodoData, 10)
  }

}
