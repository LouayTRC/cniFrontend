import { Component, HostListener, inject, Renderer2, type OnInit } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { Store } from '@ngrx/store';
import { changeSidebarSize } from '@store/layout/layout-action';
import { getSidebarSize } from '@store/layout/layout-selector';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RightsidebarComponent } from '@layouts/rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, RouterModule, FooterComponent,RightsidebarComponent],
  templateUrl: './layout.component.html',
  styles: ``,
  providers:[NgbActiveOffcanvas]
})
export class LayoutComponent implements OnInit {
  private store = inject(Store);
  private renderer = inject(Renderer2);
  private offcanvasService = inject(NgbOffcanvas);
  layoutType: any;

  ngOnInit(): void {
    this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT;
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_THEME);

      document.documentElement.setAttribute('data-menu-color', data.MENU_COLOR);
      document.documentElement.setAttribute(
        'data-topbar-color',
        data.TOPBAR_COLOR,
      );
      document.documentElement.setAttribute('data-menu-size', data.MENU_SIZE);
    });
    if (document.documentElement.clientWidth <= 1140) {
      this.onResize()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (document.documentElement.clientWidth <= 1140) {
      this.store.dispatch(changeSidebarSize({ size: 'hidden' }))
    } else {
      this.store.dispatch(changeSidebarSize({ size: 'default' }))
      document.documentElement.classList.remove('sidebar-enable')
      const backdrop = document.querySelector('.offcanvas-backdrop')
      if (backdrop) this.renderer.removeChild(document.body, backdrop)
    }
    this.store.select(getSidebarSize).subscribe((size: string) => {
      this.renderer.setAttribute(
        document.documentElement,
        'data-sidenav-size',
        size
      )
    })
  }

  onSettingsButtonClicked() {
    this.offcanvasService.open(RightsidebarComponent, {
      position: 'end',
      panelClass: 'border-0',
    });
  }

  onToggleMobileMenu() {
    this.store.select(getSidebarSize).subscribe((size: any) => {
      document.documentElement.setAttribute('data-menu-size', size);
    });

    const size = document.documentElement.getAttribute('data-menu-size');

    document.documentElement.classList.toggle('sidebar-enable');
    if (size != 'hidden') {
      if (document.documentElement.classList.contains('sidebar-enable')) {
        this.store.dispatch(changeSidebarSize({ size: 'condensed' }));
      } else {
        this.store.dispatch(changeSidebarSize({ size: 'default' }));
      }
    } else {
      this.showBackdrop();
    }
  }

  showBackdrop() {
    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'offcanvas-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');
    this.renderer.appendChild(document.body, backdrop);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    if (window.innerWidth > 1040) {
      this.renderer.setStyle(document.body, 'paddingRight', '15px');
    }

    this.renderer.listen(backdrop, 'click', () => {
      document.documentElement.classList.remove('sidebar-enable');
      this.renderer.removeChild(document.body, backdrop);
      this.renderer.setStyle(document.body, 'overflow', null);
      this.renderer.setStyle(document.body, 'paddingRight', null);
    });
  }
}
