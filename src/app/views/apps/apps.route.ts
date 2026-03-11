import type { Route } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { EmailComponent } from "./email/email.component";
import { TodoComponent } from "./todo/todo.component";

export const APPS_ROUTES: Route[] = [
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Chat' },
  },
  {
    path: 'email',
    component: EmailComponent,
    data: { title: 'Email' },
  },
  {
    path: 'todo',
    component: TodoComponent,
    data: { title: 'Todo' },
  },
]