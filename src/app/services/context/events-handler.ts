import { Injectable } from '@angular/core';
import { NbMenuService, NbToastRef, NbToastrService } from '@nebular/theme';
import { GroupUtils } from '../group';
import { switchMap, filter, map } from 'rxjs/operators';

@Injectable()
export class EventsHandler {
    constructor (
        private groupUtils: GroupUtils,
        private nbMenuService: NbMenuService,
        private nbToastrService: NbToastrService
    ) {
        this.nbMenuService.onItemClick().pipe(
            map(context => {
                if(!context.tag)
                    return;
                switch (context.tag) {
                    case 'teams':
                        const toastRef: NbToastRef = this.nbToastrService.show(
                            'Success',
                            'You have joined team: ',
                            { status: 'success', duration: 3000 }
                        )
                        break;
                    case 'post':
                        window.open(context.item.data.webUrl);
                        break;
                    default:
                        break;
                }
                return context;
            })
        ).subscribe(
            next => {

 
            }
        );
    };

}