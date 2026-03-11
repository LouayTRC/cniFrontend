import { Component, inject, type OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { changeMenuColor, changeSidebarSize, changeTheme, changeTopbarColor, resetState } from '@store/layout/layout-action';
import { getLayoutColor, getMenuColor, getSidebarSize, getTopbarColor } from '@store/layout/layout-selector';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './rightsidebar.component.html',
  styles: `
  :host {
    display: contents;
  }
`,
})
export class RightsidebarComponent implements OnInit {
  offcanvas = inject(NgbActiveOffcanvas);
  store = inject(Store);

  color: any;
  topbar: any;
  menuColor: any;
  menuSize: any;

  ngOnInit(): void {
    this.store.select('layout').subscribe((data: any) => {
      this.color = data.LAYOUT_THEME;
      this.topbar = data.TOPBAR_COLOR;
      this.menuColor = data.MENU_COLOR;
      this.menuSize = data.MENU_SIZE;
    });
  }

   // Change Layout Color
   changeLayoutColor(color: any) {
    this.store.dispatch(changeTheme({ color }));
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color);
    });
  }

  // Change Topbar Color
  changeTopbar(topbar: any) {
    this.store.dispatch(changeTopbarColor({ topbar }));
    this.store.select(getTopbarColor).subscribe((topbar) => {
      document.documentElement.setAttribute('data-topbar-color', topbar);
    });
  }

  // Change Menu Color
  changeMenu(menu: any) {
    this.store.dispatch(changeMenuColor({ menu }));
    this.store.select(getMenuColor).subscribe((menucolor) => {
      document.documentElement.setAttribute('data-menu-color', menucolor);
    });
  }

  // Change Sidebar Size
  changeSize(size: any) {
    this.store.dispatch(changeSidebarSize({ size }));
    this.store.select(getSidebarSize).subscribe((size) => {
      document.documentElement.setAttribute('data-menu-size', size);
    });
  }

  // Reset Option
  reset() {
    this.store.dispatch(resetState());
  }
}
