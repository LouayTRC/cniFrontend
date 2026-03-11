import { Component } from '@angular/core';
import { pageList } from '@views/dashboard/data';

@Component({
  selector: 'top-pages',
  standalone: true,
  imports: [],
  templateUrl: './top-pages.component.html',
  styles: ``
})
export class TopPagesComponent {
  pageList = pageList
}
