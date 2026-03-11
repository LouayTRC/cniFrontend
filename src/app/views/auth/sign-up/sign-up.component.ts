import { Component } from '@angular/core';
import { LogoBoxComponent } from "../../../components/logo-box.component";
import { SocialBtnComponent } from "../../../components/social-btn/social-btn.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [LogoBoxComponent, SocialBtnComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

}
