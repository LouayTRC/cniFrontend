import { Pipe, PipeTransform } from '@angular/core';

export interface PriorityInfo {
  text: string;
  badgeClass: string;
}

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  transform(priority: number): PriorityInfo {
    switch (priority) {
      case 1:
        return {
          text: 'Faible',
          badgeClass: 'badge-soft-success'
        };
      case 2:
        return {
          text: 'Moyenne',
          badgeClass: 'badge-soft-warning'
        };
      case 3:
        return {
          text: 'Élevée',
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
