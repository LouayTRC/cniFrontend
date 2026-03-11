import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import type { ContactType } from '../../data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

  @Input() profileDetail!: ContactType

  ngOnInit() {}
}
