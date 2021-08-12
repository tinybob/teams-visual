import { Component, OnInit } from '@angular/core';
import { GroupUtils } from '../../services/group';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.css'],
  providers: [GroupUtils]
})
export class TabsetComponent implements OnInit {

  channelsData$: any;
  eventsData$: any;

  constructor(
    private groupUtils: GroupUtils
  ) { }

  ngOnInit(): void {
    this.channelsData$ = this.groupUtils.getChannel();
    this.eventsData$ = this.groupUtils.getEvent();
  }

  changeTab(data?: any) {
    
  }
}
