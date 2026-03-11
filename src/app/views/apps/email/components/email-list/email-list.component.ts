import { Component, inject } from '@angular/core';
import { emailData } from '../../data';
import { NgbNavModule, NgbOffcanvas, type NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';
import { SharedDataService } from '../filter.service';

@Component({
  selector: 'email-list',
  standalone: true,
  imports: [NgbNavModule,CommonModule],
  templateUrl: './email-list.component.html',
  styles: ``
})
export class EmailListComponent {
  emailList = emailData
  emailTab!: string

  public sharedDataService = inject(SharedDataService)
  private offcanvasService=inject(NgbOffcanvas)

  ngOnInit(): void {
    this.sharedDataService.key$.subscribe((data) => {
      this.emailTab = data?.key!
      if (data && data.type == 'label' && data.key) {
        this.emailList = emailData.filter((item) => item.type == data.key)
      } else if (data && data.type == 'type' && data.key != 'inbox') {
        this.emailList = emailData.filter(
          (item) => (item as any)[data.key] === true
        )
      } else {
        this.emailList = emailData
      }
    })
    this.emailTab = 'inbox'
  }

  typeFilter(event: NgbNavChangeEvent) {
    if (event.nextId == 'primary') {
      this.emailList = emailData
    } else {
      this.emailList = emailData.filter((item) => item.type == event.nextId)
    }
  }

  openDetail() {
    const divContainer = document.getElementById('detailDiv')!
    this.offcanvasService.open(DetailComponent, {
      panelClass: 'mail-read position-absolute shadow show',
      backdrop: false,
      position: 'end',
      container: divContainer,
      scroll: true,
    })
  }
}
