import { User } from '@/app/entities/user';
import { logout, selectConnectedUser } from '@/store/auth';
import { changeTheme } from '@/store/layout/layout-action';
import { getLayoutColor } from '@/store/layout/layout-selector';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NgbOffcanvasModule, NgbDropdownModule, SimplebarAngularModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopBarComponent {

  store = inject(Store);
  user!: User;
  
  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => {
      if (user) this.user = user;
    });
  }



  changeTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const next = current === 'light' ? 'dark' : 'light';

    this.store.dispatch(changeTheme({ color: next }));
    document.documentElement.setAttribute('data-bs-theme', next);
  }

  logout() {
    this.store.dispatch(logout());
  }
}