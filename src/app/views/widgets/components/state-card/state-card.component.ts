import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@Component({
  selector: 'state-card',
  standalone: true,
  imports: [],
  templateUrl: './state-card.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StateCardComponent {
  stateData = [
    {
      icon: 'solar:asteroid-bold-duotone',
      iconColor: 'info',
      amount: '59.6',
      title: 'Total Income',
      badge: '8.72',
      badgeColor: 'success',
      badgeIcon: 'bx bx-doughnut-chart',
    },
    {
      icon: 'solar:black-hole-line-duotone',
      iconColor: 'success',
      amount: '24.03',
      title: 'Total Expenses',
      badge: '3.28',
      badgeColor: 'danger',
      badgeIcon: 'bx bx-bar-chart-alt-2',
    },
    {
      icon: 'solar:leaf-bold-duotone',
      iconColor: 'primary',
      amount: '48.7',
      title: 'Investments',
      badge: '5.69',
      badgeColor: 'danger',
      badgeIcon: 'bx bx-building-house',
    },
    {
      icon: 'solar:crown-star-bold-duotone',
      iconColor: 'danger',
      amount: '11.3',
      title: 'Savings',
      badge: '10.58',
      badgeColor: 'success',
      badgeIcon: 'bx bx-bowl-hot',
    },
    {
      icon: 'solar:cpu-bolt-line-duotone',
      iconColor: 'warning',
      amount: '5.06',
      title: 'Profits',
      badge: '8.72',
      badgeColor: 'success',
      badgeIcon: 'bx bx-cricket-ball',
    },
  ]
}
