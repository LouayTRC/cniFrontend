import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateComponent } from "./components/state/state.component";
import { ConversationComponent } from "./components/conversation/conversation.component";
import { SessionbycountyComponent } from "./components/sessionbycounty/sessionbycounty.component";
import { TopPagesComponent } from "./components/top-pages/top-pages.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StateComponent, ConversationComponent, SessionbycountyComponent, TopPagesComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {

}
