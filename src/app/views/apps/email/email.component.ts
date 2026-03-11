import { Component } from '@angular/core';
import { ComposeComponent } from "./components/compose/compose.component";
import { EmailTopbarComponent } from "./components/email-topbar/email-topbar.component";

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [ComposeComponent, EmailTopbarComponent],
  templateUrl: './email.component.html',
  styles: ``
})
export class EmailComponent {

}
