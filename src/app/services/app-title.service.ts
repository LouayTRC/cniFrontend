import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppTitleService {

  constructor(
    private router: Router,
    private title: Title
  ) {}

  init() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        let route = this.router.routerState.root;
        let pageTitle = 'Cni';

        while (route.firstChild) {
          route = route.firstChild;
        }

        if (route.snapshot.data?.['title']) {
          pageTitle = route.snapshot.data['title'];
        }

        this.title.setTitle(pageTitle);
      });
  }
}