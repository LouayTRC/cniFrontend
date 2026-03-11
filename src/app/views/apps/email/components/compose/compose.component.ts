import { Component, inject, type TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedDataService } from '../filter.service';
import { QuillModule } from 'ngx-quill'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'email-compose',
  standalone: true,
  imports: [SimplebarAngularModule,NgbProgressbarModule,QuillModule,NgbDropdownModule,CommonModule],
  templateUrl: './compose.component.html',
  styles: ``
})
export class ComposeComponent {
  public sharedDataService=inject(SharedDataService)
  private modalService=inject(NgbModal)

  ngOnInit() {}

  updateData(key: string, type: string) {
    this.sharedDataService.updateData(key, type)
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg', windowClass: 'compose-mail' })
  }

  editorConfig = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['direction', { align: [] }],
      ['link', 'image', 'video'],
    ],
  }
}
