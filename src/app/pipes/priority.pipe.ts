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

  transform(priority: string | number | null | undefined): PriorityInfo {

    if (!priority) {
      return {
        text: 'Inconnu',
        badgeClass: 'badge-soft-secondary'
      };
    }

    const p = String(priority).toUpperCase();

    switch (p) {

      case 'LOW':
      case 'FAIBLE':
      case '1':
        return {
          text: 'Faible',
          badgeClass: 'badge-soft-success'
        };

      case 'MEDIUM':
      case 'MOYENNE':
      case '2':
        return {
          text: 'Moyenne',
          badgeClass: 'badge-soft-warning'
        };

      case 'HIGH':
      case 'ÉLEVÉE':
      case 'ELEVEE':
      case '3':
        return {
          text: 'Élevée',
          badgeClass: 'badge-soft-danger'
        };

      case 'URGENT':
        return {
          text: 'Urgente',
          badgeClass: 'badge-soft-dark'
        };

      default:
        return {
          text: 'Inconnu',
          badgeClass: 'badge-soft-secondary'
        };
    }
  }
}