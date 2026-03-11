import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { NgbNavModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SettingComponent } from '../setting/setting.component';
import { ContactList, GroupList, UserContact, UserList, type ContactType, type GroupType, type UserContactType } from '../../data';
import { FormsModule } from '@angular/forms';
import type { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '@core/directive/swiper-directive.component';

import { register } from 'swiper/element'
import { SimplebarAngularModule } from 'simplebar-angular';
register()

@Component({
  selector: 'chat-contacts',
  standalone: true,
  imports: [FormsModule,NgbNavModule,SwiperDirective,SimplebarAngularModule],
  templateUrl: './chat-contacts.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatContactsComponent implements OnInit {
  userData = UserList
  contactData = ContactList
  groupData = GroupList
  userContactList = UserContact
  searchText: string = ''

  @Output() profileDetail = new EventEmitter<
  ContactType | GroupType | UserContactType
>()

  private offcanvasService=inject(NgbOffcanvas)

  ngOnInit(): void {
    // Fetch Data
    const data = this.contactData[2]
    this.profileDetail.emit(data)
  }

  swiperConfig: SwiperOptions = {
    slidesPerView: 6.3,
    loop: true,
  }

  openSetting(divId: string) {
    const divElement = document.getElementById(divId)!
    if (this.offcanvasService.hasOpenOffcanvas()) {
      this.offcanvasService.open(SettingComponent)
    } else {
      this.offcanvasService.open(SettingComponent, {
        container: divElement,
        panelClass: 'position-absolute shadow w-100',
        backdrop: false,
      })
    }
  }

  getDetail(user: ContactType | GroupType | UserContactType) {
    const data = user
    this.profileDetail.emit(data)
  }

  searchContact() {
    this.contactData = ContactList.filter(
      (user) =>
        user.name.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
    )
  }
}
