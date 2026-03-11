import { Component } from '@angular/core';
import { TimelineData } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styles: ``
})
export class TimelineComponent {
  timelineList = TimelineData
}
