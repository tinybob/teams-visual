import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService, NbToastrService, NbToastRef } from '@nebular/theme';
import { DialogComponent } from '../dialog/dialog.component';
import { InfiniteListComponent } from '../infinite-list/infinite-list.component';

import { GroupUtils } from '../../services/group';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.scss']
})
export class CommonListComponent implements OnInit {

  @Input()
  collection: any;

  constructor(
    private nbDialogService: NbDialogService,
    private groupUtils: GroupUtils,
    private nbToastrService: NbToastrService
  ) { }

  ngOnInit(): void {
  }

  submitEvent(data: any, event: any) {
    switch (event.title) {
      case 'eventDetails':
        this.nbDialogService.open(DialogComponent, {
          context: {
            ...data
          },
          dialogClass: 'dialog-global'
        })
        break;
    
      case 'subscribe':
        this.groupUtils.addCalendarEvent(data).subscribe(
          (next: any) => {
            const toastRef: NbToastRef = this.nbToastrService.show(
              'Success',
              `${next.subject}\n has been added to your calendar`,
              { status: 'success', duration: 3000 }
            );

            // refresh event collection
            this.groupUtils.getEvent().subscribe(
              next => {
                this.collection = next.value;
              },
              err => {
                console.error(err);
              }
            );
          },
          err => {
            console.error(err);
          }
        );
        break;
      
      case 'channelMessage':
        this.groupUtils.getPosts(data.id).subscribe(
          next => {
            const res = next;
            res.selfScroll = true;
            this.nbDialogService.open(InfiniteListComponent, {
              context: {
                collection: res
              },
              dialogClass: 'dialog-global'
            })
          },
          err => {
            console.error(err);
          }
        );
        break;
      default:
        break;
    }
  }
}
