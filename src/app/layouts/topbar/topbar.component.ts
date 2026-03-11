import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { getLayoutColor } from '@store/layout/layout-selector';
import { changeTheme } from '@store/layout/layout-action';
import { notificationsData } from './data';
import { SimplebarAngularModule } from 'simplebar-angular';
import { logout } from '@store/authentication/authentication.actions';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgbOffcanvasModule,NgbDropdownModule,SimplebarAngularModule,RouterLink],
  templateUrl: './topbar.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopbarComponent {

  notificationList = notificationsData

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
 
  router = inject(Router);
  store = inject(Store);
  offcanvasService = inject(NgbOffcanvas);

  ngOnInit():void{
    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener("webkitfullscreenchange", this.exitHandler);
    document.addEventListener("mozfullscreenchange", this.exitHandler);
  }

  settingMenu() {
    this.settingsButtonClicked.emit();
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit();
  }

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme');
    if (color == 'light') {
      this.store.dispatch(changeTheme({ color: 'dark' }));
    } else {
      this.store.dispatch(changeTheme({ color: 'light' }));
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color);
    });
  }

    /**
   * toggles full screen mode
   */
    toggleFullScreen(): void {
      let document: any = window.document;
  
      document.body.classList.toggle('fullscreen-enable');
  
      if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }

    logout() {
      this.store.dispatch(logout())
    }

      /**
   * exit handler for full screen mode
   */
  exitHandler(): void {
    let document: any = window.document;

    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      document.body.classList.remove('fullscreen-enable');
    }
  }
}
