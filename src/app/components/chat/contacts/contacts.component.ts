
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

import { Store } from '@ngrx/store';

import { ChatService } from '@/app/services/chat.service';
import { User } from '@/app/entities/user';
import { selectConnectedUser } from '@/store/auth';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, NgbNavModule, SimplebarAngularModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  connectedUser!: User
  @Input() contacts: User[] = []
  @Output() contactSelected = new EventEmitter<User>();
  searchText: string = ''
  filtredContacts!: User[]
  filtredDiscussions!: any[]
  discussions: any[] = []
  store = inject(Store)


  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log("ddd", this.contacts);
    this.filtredContacts = this.contacts

    this.store.select(selectConnectedUser).subscribe(async (user) => {
      this.connectedUser=user
      if (user) {
       
        this.chatService.getUserDiscussions(user.id).subscribe((res)=>{
          console.log("res");
          this.discussions=res
          this.filtredDiscussions=this.discussions
        })
      }
    })

  }


  searchContact() {
    this.filtredContacts = this.contacts.filter(
      (user) =>
        user.fullname.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
    )

    const usersIds = this.filtredContacts.map(c => c.id)

    this.filtredDiscussions = this.discussions.filter(d =>
      d.participants.some((participantId: string) =>
        usersIds.includes(participantId)
      )
    );
    console.log("ddd", this.filtredDiscussions);



  }

  selectContact(id: string) {
    console.log("id", id);

    this.contactSelected.emit(this.contacts.filter(c => c.id == id)[0])
  }

  getUser(discussion: any) {
    console.log("connectedUSer",this.connectedUser);
    
    let user
    if (discussion.participants[0] == this.connectedUser.id) {
      user = this.contacts.filter(c => c.id == discussion.participants[1])
    }
    else {
      user = this.contacts.filter(c => c.id == discussion.participants[0])
    }
    return user[0]
  }
}
