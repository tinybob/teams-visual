import { Component, OnInit, Input } from '@angular/core';
import { GroupUtils } from '../../services/group';
import { EventsHandler } from '../../services/context/events-handler';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
  providers:[GroupUtils, EventsHandler]
})
export class InfiniteListComponent implements OnInit {

  @Input()
  collection: any;

  constructor(
    private groupUtils: GroupUtils,
    private eventsHandler: EventsHandler
  ) { }

  ngOnInit(): void {
  }

  loadNext(context: any) {
    if( !context['@odata.nextLink'] ||
      context.loading )
      return ;
    
    context.loading = true;
    context.placeholders = new Array(1);
    this.groupUtils.getNextPage(context)?.subscribe(
      next => {
        context = next;
        context.placeholders = [];
        context.loading = false;
      },
      err => {
        console.error(err);
      }
    );
  }
}
