import { Component, inject } from '@angular/core';
import { ContactsComponent } from "./contacts/contacts.component";
import { DiscussionComponent } from "./discussion/discussion.component";
import { Store } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { User } from '@/app/entities/user';
import { ChatService } from '@/app/services/chat.service';
import { selectConnectedUser, selectToken } from '@/store/auth';
import { getToken } from '@angular/fire/messaging';
import { UserService } from '@/app/services/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ContactsComponent, DiscussionComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  store = inject(Store)
  headers!: HttpHeaders
  contacts: User[] = []
  selectedContact!: User
  connectedUser!: User

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.store.select(selectConnectedUser).subscribe((user) => {
      if (user) {
        this.connectedUser=user
        this.store.select(selectToken).subscribe(async (token) => {
          if (token) {
            this.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            });
            this.userService.getAllUsers(this.headers).subscribe((res) => {
              this.contacts = res.filter((u: User) => u.id !== this.connectedUser.id);
              console.log("cint",this.contacts);
              
            })


          }
        })
      }
    })


  }

  onContactSelected(contact: User) {
    this.selectedContact = contact
    console.log("sel", this.selectedContact);

  }

}
