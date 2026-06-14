import { ChatbotService } from '@/app/services/chatbot.service';
import { selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  httpHeaders!: HttpHeaders;

  messages: Message[] = [];
  inputText = '';
  loading = false;

  store = inject(Store);
  

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
      this.store.select(selectToken).subscribe((token: any) => {
  
        if (token) {
  
          this.httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${token}`
          });
  
        }
      });
    }

  sendMessage() {
    if (!this.inputText.trim()) return;

    const userMsg: Message = {
      role: 'user',
      text: this.inputText
    };

    this.messages.push(userMsg);

    const messageToSend = this.inputText;
    this.inputText = '';
    this.loading = true;

    this.chatbotService.sendMessage(messageToSend,this.httpHeaders).subscribe({
      next: (res) => {
        this.messages.push({
          role: 'bot',
          text: res.reply
        });
        this.loading = false;
      },
      error: () => {
        this.messages.push({
          role: 'bot',
          text: 'Error: failed to get response'
        });
        this.loading = false;
      }
    });
  }
}
