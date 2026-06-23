import { Pipe, PipeTransform } from '@angular/core';

export interface StatusInfo {
  text: string;
  badgeClass: string;
}

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(status: number): StatusInfo {
    switch (status) {
      case 0:
        return {
          text: 'En attente',
          badgeClass: 'badge-soft-warning'
        };
      case 1:
        return {
          text: 'Traitée',
          badgeClass: 'badge-soft-success'
        };
      case -1:
        return {
          text: 'Rejetée',
          badgeClass: 'badge-soft-danger'
        };
      default:
        return {
          text: 'Inconnu',
          badgeClass: 'badge-soft-secondary'
        };
    }
  }

}
