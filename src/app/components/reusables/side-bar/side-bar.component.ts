import { findAllParent } from '@/app/utils/functions';
import { ADMIN_MENU, MenuItem, RESPONSABLE_MENU } from '@/app/utils/sidebarMenus';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from "simplebar-angular";
import { RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { UserRole } from '@/app/utils/enums';
import { changeSidebarSize } from '@/store/layout/layout-action';
import { getSidebarSize } from '@/store/layout/layout-selector';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SimplebarAngularModule, CommonModule, NgbCollapse, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SideBarComponent {

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];

  store = inject(Store);

  @Input() role!: string;

  ngOnInit(): void {
    if (this.role === UserRole.admin) {
      this.menuItems = ADMIN_MENU;
    }
    else if (this.role === UserRole.responsable) {
      this.menuItems = RESPONSABLE_MENU;
    }
  }

  
    /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
    hasSubmenu(menu: MenuItem): boolean {
      return menu.subMenu ? true : false;
    }

     /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key'],
        ...findAllParent(this.menuItems, menuItem),
      ];
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }
  }

}