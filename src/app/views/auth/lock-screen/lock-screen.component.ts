import { Component } from '@angular/core';
import { LogoBoxComponent } from "../../../components/logo-box.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lock-screen',
  standalone: true,
  imports: [LogoBoxComponent,RouterLink],
  templateUrl: './lock-screen.component.html',
  styles: ``
})
export class LockScreenComponent {

}
