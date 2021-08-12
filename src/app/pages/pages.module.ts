import { NgModule } from '@angular/core';
import { 
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbUserModule,
  NbButtonModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbIconModule,
  NbDialogModule,
  NbActionsModule
} from '@nebular/theme';

import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { GroupCardComponent } from './group-card/group-card.component';
import { HomeComponent } from './home/home.component';
import { TabsetComponent } from './tabset/tabset.component';
import { SummaryComponent } from './tabset/summary/summary.component';
import { CommonListComponent } from './common-list/common-list.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { ListItemComponent } from './infinite-list/list-item/list-item.component';
import { ListItemPlaceholderComponent } from './infinite-list/list-item-placeholder/list-item-placeholder.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    PagesComponent,
    GroupCardComponent,
    HomeComponent,
    TabsetComponent,
    SummaryComponent,
    CommonListComponent,
    InfiniteListComponent,
    ListItemComponent,
    ListItemPlaceholderComponent,
    CalendarComponent,
    DialogComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NbActionsModule
  ]
})
export class PagesModule { }
