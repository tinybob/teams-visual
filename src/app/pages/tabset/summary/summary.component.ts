import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabset-summary',
  styleUrls: ['./summary.component.scss'],
  template: `<div class="summary-container">
    <div *ngFor="let item of summary">
      <div>{{ item.title }}</div>
      <div class="h6">{{ item.value }}</div>
    </div>
  </div>`
})
export class SummaryComponent  {

  @Input() 
  summary: { title: string; value: string; }[] | any;

}
