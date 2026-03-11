import { Component } from '@angular/core';
import { ChatContactsComponent } from "./components/chat-contacts/chat-contacts.component";
import type { ContactType, GroupType, UserContactType } from './data';
import { ChatListComponent } from "./components/chat-list/chat-list.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatContactsComponent, ChatListComponent],
  templateUrl: './chat.component.html',
  styles: ``
})
export class ChatComponent {
  profileDetail!: ContactType | GroupType | UserContactType

  receiveDataFromChild(data: ContactType | GroupType | UserContactType) {
    this.profileDetail = data
  }
}
