import { User } from '@/app/entities/user';
import { ChatService } from '@/app/services/chat.service';
import { selectConnectedUser, selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { SimplebarAngularComponent, SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [RouterLink, SimplebarAngularModule, CommonModule, FormsModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss'
})
export class DiscussionComponent {
  @ViewChild('scrollRef') scrollRef!: SimplebarAngularComponent;
  @Input() contact!: User
  store = inject(Store)
  headers!: HttpHeaders
  connectedUser!: User
  messages: any[] = []
  message: string = ""

  constructor(private chatService: ChatService) { }


  ngOnInit() {


    this.store.select(selectConnectedUser).subscribe(async (user) => {
      console.log("user",user);
      
      if (user) {
        this.connectedUser = user;
        this.loadMessages()
        this.store.select(selectToken).subscribe((token) => {
          if (token) {
            this.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            });
          }
        })
      }
    });
  }

  async loadMessages() {
    this.messages = []
    const discussionId = await this.chatService.getDiscussion(this.connectedUser.id, this.contact.id);

    if (discussionId) {
      this.chatService.listenToMessages(discussionId).subscribe((messages) => {
        if (this.messages.length == 0) {
          this.scrollToBottom()
        }
        this.messages = messages;

      });
    } else {
      this.messages = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.connectedUser) {
      this.loadMessages();
    }
  }

  async sendMessage() {
    if (this.message.length > 0) {
      await this.chatService.sendMessage(this.connectedUser.id, this.contact.id, this.message, this.headers)
      this.message = ''

      if (this.messages.length === 0) {
        this.loadMessages();
      }
      this.scrollToBottom()
    }


  }

  convertDate(timestamp: any) {
    return new Date(timestamp.seconds * 1000)
  }


  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollRef && this.scrollRef.SimpleBar) {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
      }
    }, 100);
  }
}
