import { UserRole } from '@/app/utils/enums';
import { changeSidebarSize } from '@/store/layout/layout-action';
import { getSidebarSize } from '@/store/layout/layout-selector';
import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '@component/reusables/side-bar/side-bar.component';
import { TopBarComponent } from '@component/reusables/top-bar/top-bar.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopBarComponent, SideBarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  role!: string;

  store = inject(Store);
  private renderer = inject(Renderer2);

  constructor(private active: ActivatedRoute) {}

  ngOnInit(): void {

    this.active.url.subscribe(url => {
      const route = url[0].path;

      if (route === UserRole.admin.toLowerCase()) this.role = UserRole.admin;
      if (route === UserRole.operateur.toLowerCase()) this.role = UserRole.operateur;
      if (route === UserRole.responsable.toLowerCase()) this.role = UserRole.responsable;
    });

    this.store.select('layout').subscribe(data => {
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_THEME);
      document.documentElement.setAttribute('data-menu-color', data.MENU_COLOR);
      document.documentElement.setAttribute('data-topbar-color', data.TOPBAR_COLOR);
      document.documentElement.setAttribute('data-menu-size', data.MENU_SIZE);
    });

    this.store.select(getSidebarSize).subscribe(size => {
      document.documentElement.setAttribute('data-sidenav-size', size);
    });

    if (document.documentElement.clientWidth <= 1140) {
      this.onResize();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (document.documentElement.clientWidth <= 1140) {
      this.store.dispatch(changeSidebarSize({ size: 'hidden' }));
    } else {
      this.store.dispatch(changeSidebarSize({ size: 'default' }));
      document.documentElement.classList.remove('sidebar-enable');

      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) this.renderer.removeChild(document.body, backdrop);
    }
  }

  // 🔥 IMPORTANT: mobile toggle HERE (not sidebar)
  onToggleMobileMenu() {

    const current = document.documentElement.getAttribute('data-menu-size');

    document.documentElement.classList.toggle('sidebar-enable');

    if (current !== 'hidden') {
      const isEnabled = document.documentElement.classList.contains('sidebar-enable');

      this.store.dispatch(changeSidebarSize({
        size: isEnabled ? 'condensed' : 'default'
      }));
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

    this.renderer.listen(backdrop, 'click', () => {
      document.documentElement.classList.remove('sidebar-enable');
      this.renderer.removeChild(document.body, backdrop);
      this.renderer.setStyle(document.body, 'overflow', null);
    });
  }
}